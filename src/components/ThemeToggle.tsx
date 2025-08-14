"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize from localStorage or system preference
  useEffect(() => {
    const root = document.documentElement;
    const stored = (localStorage.getItem("theme") as Theme | null) ?? null;
    let next: Theme = "light";
    if (stored) {
      next = stored;
      root.classList.add("forced-theme");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      next = prefersDark ? "dark" : "light";
      root.classList.remove("forced-theme");
    }
    setTheme(next);
    applyTheme(next);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    root.classList.add("forced-theme");
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/30 px-3 py-1.5 text-sm hover:shadow-md hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--input-border)] cursor-pointer transition"
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
    >
      <span className="i-theme w-4 h-4" aria-hidden>
        {theme === "dark" ? (
          // Moon icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        ) : (
          // Sun icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l1.41-1.41m8.49-8.49l1.41-1.41" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )}
      </span>
      <span className="hidden sm:inline">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
