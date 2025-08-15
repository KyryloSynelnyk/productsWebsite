export default function Loading() {
  return (
    <div className="min-h-dvh p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Checkout</h1>
          <div className="h-5 w-24 rounded" style={{ backgroundColor: "var(--card-border)" }} />
        </header>
      </div>

      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-6 sm:mt-8 animate-pulse">
        <section className="rounded-2xl backdrop-blur p-5 sm:p-6 border bg-[color:var(--card-bg)] border-[color:var(--card-border)]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl" style={{ backgroundColor: "var(--card-border)" }} />
          <div className="mt-5 h-7 w-1/2 rounded" style={{ backgroundColor: "var(--card-border)" }} />
          <div className="mt-2 h-4 w-1/3 rounded" style={{ backgroundColor: "var(--card-border)" }} />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full rounded" style={{ backgroundColor: "var(--card-border)" }} />
            <div className="h-4 w-5/6 rounded" style={{ backgroundColor: "var(--card-border)" }} />
          </div>
        </section>
        <section className="rounded-2xl backdrop-blur p-5 sm:p-6 border bg-[color:var(--card-bg)] border-[color:var(--card-border)]">
          <div className="h-6 w-40 rounded" style={{ backgroundColor: "var(--card-border)" }} />
          <div className="mt-4 space-y-3">
            <div className="h-4 w-full rounded" style={{ backgroundColor: "var(--card-border)" }} />
            <div className="h-4 w-2/3 rounded" style={{ backgroundColor: "var(--card-border)" }} />
            <div className="h-4 w-1/2 rounded" style={{ backgroundColor: "var(--card-border)" }} />
          </div>
          <div className="mt-6 h-10 w-full rounded" style={{ backgroundColor: "var(--card-border)" }} />
        </section>
      </div>

      <div className="max-w-6xl mx-auto mt-10 text-xs" style={{ color: "var(--muted)" }}>
        Demo store — not a real purchase.
      </div>
    </div>
  );
}
