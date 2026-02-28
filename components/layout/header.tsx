"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
    const t = useTranslations("nav");

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-lg font-bold">{SITE_NAME}</span>
                </Link>

                <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
                    <Link
                        href="/"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        {t("home")}
                    </Link>
                    <Link
                        href="/database/classes"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        {t("database")}
                    </Link>
                    <Link
                        href="/download"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        {t("download")}
                    </Link>
                </nav>

                <div className="flex items-center space-x-2">
                    <LocaleSwitcher />
                </div>
            </div>
        </header>
    );
}
