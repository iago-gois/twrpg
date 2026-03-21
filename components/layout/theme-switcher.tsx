"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    const initialTheme: ThemePreference =
      storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
        ? storedTheme
        : "system";

    setTheme(initialTheme);
    setSystemPrefersDark(mediaQuery.matches);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setSystemPrefersDark(event.matches);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    setMounted(true);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  function getNextTheme(currentTheme: ThemePreference): ThemePreference {
    if (currentTheme === "system") return "light";
    if (currentTheme === "light") return "dark";
    return "system";
  }

  function handleThemeCycle() {
    setTheme((currentTheme) => {
      const nextTheme = getNextTheme(currentTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  }

  const ThemeIcon = theme === "system" ? Laptop : resolvedTheme === "dark" ? Moon : Sun;
  const themeLabel =
    theme === "system"
      ? `System (${resolvedTheme === "dark" ? "Dark" : "Light"})`
      : theme === "dark"
        ? "Dark"
        : "Light";

  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      aria-label={`Cycle theme (${themeLabel})`}
      disabled={!mounted}
      onClick={handleThemeCycle}
      tooltip={themeLabel}
      className="cursor-pointer transition-transform active:scale-95"
    >
      <ThemeIcon className="h-4 w-4" />
    </Button>
  );
}
