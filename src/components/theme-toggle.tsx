"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("home-style-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enabled = saved ? saved === "dark" : prefersDark;
    setDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("home-style-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/30 bg-white/70 px-4 text-sm font-semibold text-[#3E3933] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-xl dark:border-white/10 dark:bg-white/10 dark:text-white"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#3E3933] text-xs text-white transition group-hover:rotate-12 dark:bg-[#ECDDCC] dark:text-[#3E3933]">
        {dark ? "☾" : "☀"}
      </span>
      {dark ? "Dark" : "Light"}
    </button>
  );
}
