export default function Loading() {
  return (
    <div className="min-h-dvh p-6 sm:p-10 font-sans">
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-pulse">
        <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur p-5 sm:p-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/5" />
          <div className="mt-5 h-7 w-1/2 bg-black/10 dark:bg-white/10 rounded" />
          <div className="mt-2 h-4 w-1/3 bg-black/10 dark:bg-white/10 rounded" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-4 w-5/6 bg-black/10 dark:bg-white/10 rounded" />
          </div>
        </section>
        <section className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur p-5 sm:p-6">
          <div className="h-6 w-40 bg-black/10 dark:bg-white/10 rounded" />
          <div className="mt-4 space-y-3">
            <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-4 w-1/2 bg-black/10 dark:bg-white/10 rounded" />
          </div>
          <div className="mt-6 h-10 w-full bg-black/10 dark:bg-white/10 rounded" />
        </section>
      </div>
    </div>
  );
}
