"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh p-6 sm:p-10 font-sans flex items-center justify-center">
      <div className="max-w-md w-full rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/40 dark:bg-red-900/10 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">Something went wrong</h2>
        <p className="mt-2 text-sm text-red-800/80 dark:text-red-200/80">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700 active:scale-[0.98] transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
