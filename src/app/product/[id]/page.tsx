import ProductCheckout from "@/components/ProductCheckout";
import type { Product } from "../../../types/product";
import Link from "next/link";

async function getProduct(productId: number): Promise<Product> {
  const url = `https://dummyjson.com/products/${productId}?select=title,price,description,images,thumbnail,rating,brand,category`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load product (id ${productId})`);
  }
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = await getProduct(id);

  return (
    <div className="min-h-dvh p-6 sm:p-10 font-sans">
      <header className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Checkout</h1>
        <Link href={"/"} className="text-sm text-black/60 dark:text-white/60 hover:underline">
          All products
        </Link>
      </header>
      <main className="mt-6 sm:mt-8">
        <ProductCheckout product={product} />
      </main>
      <footer className="max-w-6xl mx-auto mt-10 text-xs text-black/50 dark:text-white/50">
        Demo store — not a real purchase.
      </footer>
    </div>
  );
}
