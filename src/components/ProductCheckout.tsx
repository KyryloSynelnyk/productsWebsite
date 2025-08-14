"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number; // USD
  thumbnail?: string;
  images?: string[];
  rating?: number;
  brand?: string;
  category?: string;
};

const PROMO_CODES: Record<string, { type: "percent" | "fixed"; value: number; label: string }> = {
  SAVE10: { type: "percent", value: 10, label: "Save 10%" },
  SAVE20: { type: "percent", value: 20, label: "Save 20% (orders > $100)" },
  WELCOME5: { type: "fixed", value: 5, label: "$5 off" },
};

function formatUSD(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function ProductCheckout({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const images = (product.images && product.images.length > 0)
    ? product.images
    : (product.thumbnail ? [product.thumbnail] : ["/placeholder.svg"]);
  const displayImage = images[imgIdx % images.length];

  const subtotal = useMemo(() => product.price * qty, [product.price, qty]);

  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    const promo = PROMO_CODES[appliedPromo];
    if (!promo) return 0;
    if (promo.type === "percent") {
      // Additional rule: SAVE20 only if subtotal > 100
      if (appliedPromo === "SAVE20" && subtotal <= 100) return 0;
      return (subtotal * promo.value) / 100;
    }
    return Math.min(subtotal, promo.value);
  }, [appliedPromo, subtotal]);

  const total = useMemo(() => Math.max(0, subtotal - discount), [subtotal, discount]);

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    setPromoError(null);
    if (!code) return;

    if (!PROMO_CODES[code]) {
      setAppliedPromo(null);
      setPromoError("Invalid promo code");
      return;
    }
    setAppliedPromo(code);
  }

  function clearPromo() {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError(null);
  }

  return (
    <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Card */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-[color:var(--card-border)] bg-[color:var(--card-bg)] backdrop-blur p-5 sm:p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/5">
          <Image
            src={displayImage}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-2 text-sm shadow hover:shadow-md cursor-pointer"
                style={{ backgroundColor: "var(--panel-bg)", border: "1px solid var(--input-border)" }}
              >
                ‹
              </button>
              <button
                aria-label="Next image"
                onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-2 text-sm shadow hover:shadow-md cursor-pointer"
                style={{ backgroundColor: "var(--panel-bg)", border: "1px solid var(--input-border)" }}
              >
                ›
              </button>
            </>
          )}
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{product.title}</h1>
            {product.brand && (
              <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>by {product.brand}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold">{formatUSD(product.price)}</div>
            {product.rating && (
              <div className="text-xs" style={{ color: "var(--muted)" }}>Rating: {product.rating}/5</div>
            )}
          </div>
        </div>
        <p className="mt-3 leading-relaxed" style={{ color: "var(--foreground)" }}>
          {product.description}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm">Quantity</span>
          <div className="inline-flex items-center rounded-full border border-[color:var(--card-border)] overflow-hidden">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-2 hover:bg-black/5 active:scale-95 transition"
            >
              −
            </button>
            <span className="px-4 select-none min-w-8 text-center">{qty}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="px-3 py-2 hover:bg-black/5 active:scale-95 transition"
            >
              +
            </button>
          </div>
        </div>
      </motion.section>

      {/* Summary + Promo */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="rounded-2xl border border-[color:var(--card-border)] bg-[color:var(--card-bg)] backdrop-blur p-5 sm:p-6 h-max sticky top-6"
      >
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span style={{ color: "var(--muted)" }}>Subtotal</span>
            <span>{formatUSD(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--muted)" }}>Discount</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={appliedPromo ? `disc-${appliedPromo}-${discount}` : `disc-0`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                {discount > 0 ? `- ${formatUSD(discount)}` : "—"}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-[color:var(--card-border)]">
            <span>Total</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`total-${total}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                {formatUSD(total)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <form onSubmit={applyPromo} className="mt-6">
          <label className="text-sm font-medium">Have a promo code?</label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Enter code (e.g., SAVE10)"
              className="flex-1 rounded-lg border bg-transparent px-3 py-2 outline-none focus:ring-2"
              style={{ borderColor: "var(--input-border)" }}
            />
            <button
              type="submit"
              className="rounded-lg px-4 py-2 font-medium hover:shadow-md hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--input-border)] cursor-pointer transition"
              style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
            >
              Apply
            </button>
          </div>
          <div className="min-h-6 mt-2">
            <AnimatePresence>
              {promoError && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-xs text-red-600"
                >
                  {promoError}
                </motion.p>
              )}
            </AnimatePresence>
            {appliedPromo && !promoError && (
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-1">
                  Applied: {appliedPromo} — {PROMO_CODES[appliedPromo].label}
                </span>
                <button type="button" onClick={clearPromo} className="underline hover:opacity-80" style={{ color: "var(--muted)" }}>
                  Remove
                </button>
              </div>
            )}
          </div>
        </form>

        <button
          className="mt-6 w-full rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl active:scale-[0.99] transition"
          style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
          onClick={() => alert(`Order placed for ${qty} x ${product.title} — Total ${formatUSD(total)}`)}
        >
          Checkout
        </button>

        <p className="text-[11px] mt-3" style={{ color: "var(--muted)" }}>
          Use codes: SAVE10, SAVE20 (orders &gt; $100), WELCOME5
        </p>
      </motion.section>
    </div>
  );
}
