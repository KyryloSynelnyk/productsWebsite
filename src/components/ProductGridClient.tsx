"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "../types/product";

export default function ProductGridClient({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false);
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft" && activeImages.length > 1) setIndex((i) => (i - 1 + activeImages.length) % activeImages.length);
      if (e.key === "ArrowRight" && activeImages.length > 1) setIndex((i) => (i + 1) % activeImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, activeImages.length]);

  function openModal(images?: string[], fallback?: string) {
    const imgs = (images && images.length > 0 ? images : [fallback || "/placeholder.svg"]).filter(Boolean) as string[];
    setActiveImages(imgs);
    setIndex(0);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function prev() {
    setIndex((i) => (i - 1 + activeImages.length) % activeImages.length);
  }

  function next() {
    setIndex((i) => (i + 1) % activeImages.length);
  }

  return (
    <>
      <main className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p.id} className="group rounded-2xl backdrop-blur p-4 hover:shadow-md transition-shadow border bg-[color:var(--card-bg)] border-[color:var(--card-border)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]">
            <Link href={`/product/${p.id}`} className="block">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/5">
                <Image
                  src={p.images?.[0] || p.thumbnail || "/placeholder.svg"}
                  alt={p.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold line-clamp-1">{p.title}</h3>
                  {p.brand && (
                    <p className="text-xs line-clamp-1" style={{ color: "var(--muted)" }}>
                      {p.brand}
                    </p>
                  )}
                </div>
                <div className="text-right text-base font-bold">${p.price}</div>
              </div>
            </Link>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => openModal(p.images, p.thumbnail)}
                className="flex-1 text-center rounded-lg px-3 py-2 text-sm font-medium hover:shadow active:scale-[0.99] transition cursor-pointer hover:cursor-pointer"
                style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
              >
                View Image
              </button>
              <Link
                href={`/product/${p.id}`}
                className="flex-1 text-center rounded-lg px-3 py-2 text-sm font-medium hover:shadow active:scale-[0.99] transition"
                style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
              >
                Buy
              </Link>
            </div>
          </div>
        ))}
      </main>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Close"
              onClick={close}
              className="absolute -top-2 -right-2 z-20 rounded-full bg-white text-black px-2 py-1 text-sm shadow hover:shadow-md"
            >
              ×
            </button>

            <div className="relative w-full aspect-[16/10] bg-black/20 rounded-lg overflow-hidden">
              {/* Use next/image for optimization; fill container */}
              <Image
                src={activeImages[index]}
                alt="Product image"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Controls */}
            {activeImages.length > 1 && (
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={prev}
                  className="rounded-lg px-3 py-2 text-sm font-medium border"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  Prev
                </button>
                <div className="text-xs" style={{ color: "var(--muted)" }}>
                  {index + 1} / {activeImages.length}
                </div>
                <button
                  onClick={next}
                  className="rounded-lg px-3 py-2 text-sm font-medium border"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
