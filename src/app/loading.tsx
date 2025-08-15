export default function Loading() {
  return (
    <div className="min-h-dvh p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto animate-pulse">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Products</h1>
          <div className="h-6 w-28 rounded" style={{ backgroundColor: "var(--card-border)" }} />
        </header>

        {/* Controls skeleton */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="h-10 rounded" style={{ backgroundColor: "var(--card-border)" }} />
          <div className="h-10 rounded" style={{ backgroundColor: "var(--card-border)" }} />
          <div className="flex gap-2">
            <div className="flex-1 h-10 rounded" style={{ backgroundColor: "var(--card-border)" }} />
            <div className="w-[120px] h-10 rounded" style={{ backgroundColor: "var(--card-border)" }} />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-10 rounded" style={{ backgroundColor: "var(--card-border)" }} />
            <div className="h-10 w-20 rounded" style={{ backgroundColor: "var(--card-border)" }} />
            <div className="h-10 w-20 rounded" style={{ backgroundColor: "var(--card-border)" }} />
          </div>
        </div>

        {/* Grid skeleton matching ProductGridClient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl backdrop-blur p-4 border bg-[color:var(--card-bg)] border-[color:var(--card-border)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]"
            >
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
                style={{ backgroundColor: "var(--card-border)" }}
              />
              <div className="mt-3 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="h-4 w-2/3 rounded" style={{ backgroundColor: "var(--card-border)" }} />
                  <div className="mt-2 h-3 w-1/3 rounded" style={{ backgroundColor: "var(--card-border)" }} />
                </div>
                <div className="h-4 w-12 rounded" style={{ backgroundColor: "var(--card-border)" }} />
              </div>
              <div className="mt-3 flex gap-2">
                <div className="flex-1 h-8 rounded" style={{ backgroundColor: "var(--card-border)" }} />
                <div className="flex-1 h-8 rounded" style={{ backgroundColor: "var(--card-border)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
