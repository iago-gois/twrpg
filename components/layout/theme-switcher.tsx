"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemePreference = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

export function ThemeSwitcher() {
	const [theme, setTheme] = useState<ThemePreference>("system");
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");
	const [mounted, setMounted] = useState(false);

	const applyTheme = useCallback(
		(nextTheme: ThemePreference, prefersDark: boolean) => {
			const nextResolvedTheme: ResolvedTheme =
				nextTheme === "system" ? (prefersDark ? "dark" : "light") : nextTheme;

			document.documentElement.classList.toggle(
				"dark",
				nextResolvedTheme === "dark",
			);
			setResolvedTheme(nextResolvedTheme);
		},
		[],
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const storedTheme = localStorage.getItem(STORAGE_KEY);
		const initialTheme: ThemePreference =
			storedTheme === "light" ||
			storedTheme === "dark" ||
			storedTheme === "system"
				? storedTheme
				: "system";

		applyTheme(initialTheme, mediaQuery.matches);
		setTheme(initialTheme);

		const handleSystemThemeChange = (event: MediaQueryListEvent) => {
			const selectedTheme = (localStorage.getItem(STORAGE_KEY) ??
				"system") as ThemePreference;

			if (selectedTheme === "system") {
				applyTheme("system", event.matches);
			}
		};

		mediaQuery.addEventListener("change", handleSystemThemeChange);
		setMounted(true);

		return () => {
			mediaQuery.removeEventListener("change", handleSystemThemeChange);
		};
	}, [applyTheme]);

	function handleThemeChange(nextTheme: string) {
		const selectedTheme = nextTheme as ThemePreference;
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		setTheme(selectedTheme);
		applyTheme(selectedTheme, prefersDark);
		localStorage.setItem(STORAGE_KEY, selectedTheme);
	}

	const ThemeIcon =
		theme === "system" ? Laptop : resolvedTheme === "dark" ? Moon : Sun;
	const themeLabel =
		theme === "system"
			? `System (${resolvedTheme === "dark" ? "Dark" : "Light"})`
			: theme === "dark"
				? "Dark"
				: "Light";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					aria-label="Select theme"
					disabled={!mounted}
					className="cursor-pointer transition-transform active:scale-95 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
				>
					<ThemeIcon className="h-4 w-4" />
					<span className="ml-2">{themeLabel}</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
					<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
