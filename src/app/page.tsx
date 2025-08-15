import Link from "next/link";
import ProductGridClient from "../components/ProductGridClient";
import type { Product, ProductsResponse } from "../types/product";

async function getCategories(): Promise<string[]> {

  const res = await fetch("https://dummyjson.com/products/category-list", { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to load categories");
  const data = await res.json();

  if (Array.isArray(data)) {
    if (typeof data[0] === "string" || data.length === 0) return data as string[];
    
    return (data as Array<{ slug?: string; name?: string }>).map((c) => c.slug || c.name || "").filter(Boolean);
  }
  return [];
}

async function getProducts(params: {
  q?: string;
  category?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const { q, category, sortBy, order = "asc", page = 1, limit = 12 } = params;
  const skip = (page - 1) * limit;
  const base = category
    ? `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
    : q
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`
    : `https://dummyjson.com/products`;

  const url = new URL(base);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  url.searchParams.set(
    "select",
    "title,price,description,images,thumbnail,rating,brand,category"
  );

  if (sortBy) {
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("order", order);
  }

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load products");
  const data = (await res.json()) as ProductsResponse;

  // Fallback client-side sort if API didn't sort (mainly for search/category)
  if (sortBy) {
    const dir = order === "desc" ? -1 : 1;
    data.products.sort((a: any, b: any) => {
      const va = (a as any)[sortBy];
      const vb = (b as any)[sortBy];
      if (typeof va === "string" && typeof vb === "string") return va.localeCompare(vb) * dir;
      return ((va ?? 0) - (vb ?? 0)) * dir;
    });
  }

  return data;
}

function buildQuery(params: Record<string, string | number | undefined>) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.set(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    page?: string;
    limit?: string;
  };
}) {
  const q = searchParams?.q?.trim() || undefined;
  const category = searchParams?.category || undefined;
  const sortBy = searchParams?.sortBy || undefined;
  const order = (searchParams?.order as "asc" | "desc") || "asc";
  const page = Number(searchParams?.page || 1);
  const limit = Number(searchParams?.limit || 12);

  const [categories, data] = await Promise.all([
    getCategories().catch(() => [] as string[]),
    getProducts({ q, category, sortBy, order, page, limit }),
  ]);

  const totalPages = Math.max(1, Math.ceil((data.total || 0) / limit));

  return (
    <div className="min-h-dvh p-6 sm:p-10 font-sans">
      <header className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Products</h1>

      </header>

      {/* Controls */}
      <form className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" method="get">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search products..."
          className="rounded-lg px-3 py-2 outline-none focus:ring-2"
          style={{ backgroundColor: "var(--panel-bg)", border: "1px solid var(--input-border)" }}
        />
        <select
          name="category"
          defaultValue={category || ""}
          className="rounded-lg px-3 py-2"
          style={{ backgroundColor: "var(--panel-bg)", border: "1px solid var(--input-border)" }}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <select name="sortBy" defaultValue={sortBy || ""} className="flex-1 rounded-lg px-3 py-2" style={{ backgroundColor: "var(--panel-bg)", border: "1px solid var(--input-border)" }}>
            <option value="">Sort by</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          <select name="order" defaultValue={order} className="w-[120px] rounded-lg px-3 py-2" style={{ backgroundColor: "var(--panel-bg)", border: "1px solid var(--input-border)" }}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <select name="limit" defaultValue={String(limit)} className="flex-1 rounded-lg px-3 py-2" style={{ backgroundColor: "var(--panel-bg)", border: "1px solid var(--input-border)" }}>
            {[12, 24, 48].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
          <div className="flex gap-2 flex-nowrap items-center">
            <button className="rounded-lg px-4 py-2 font-medium hover:shadow-md hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--input-border)] cursor-pointer transition whitespace-nowrap" type="submit" style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}>
              Apply
            </button>
            <Link href="/" className="rounded-lg px-3 py-2 font-medium hover:shadow-md active:scale-[0.98] transition text-center whitespace-nowrap" style={{ backgroundColor: "var(--panel-bg)", border: "1px solid var(--input-border)" }}>
              Clear
            </Link>
          </div>
        </div>
      </form>

      {/* Grid */}
      <ProductGridClient products={data.products as Product[]} />

      {/* Pagination */}
      <div className="max-w-6xl mx-auto mt-8 flex items-center justify-between">
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Link
            aria-disabled={page <= 1}
            className={`rounded-lg px-3 py-2 border ${page <= 1 ? "opacity-50 pointer-events-none" : ""}`}
            style={{ borderColor: "var(--card-border)" }}
            href={buildQuery({ q, category, sortBy, order, page: Math.max(1, page - 1), limit })}
          >
            Previous
          </Link>
          <Link
            aria-disabled={page >= totalPages}
            className={`rounded-lg px-3 py-2 border ${page >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
            style={{ borderColor: "var(--card-border)" }}
            href={buildQuery({ q, category, sortBy, order, page: Math.min(totalPages, page + 1), limit })}
          >
            Next
          </Link>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto mt-10 text-xs" style={{ color: "var(--muted)" }}>
        Demo store — click any product to view checkout.
      </footer>
    </div>
  );
}
