"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const LOCALE_LABELS = {
    en: "🇺🇸 EN",
    pt: "🇧🇷 PT",
} as const;

export function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function handleSwitch() {
        const nextLocale = locale === "en" ? "pt" : "en";
        router.replace(pathname, { locale: nextLocale });
    }

    return (
        <Button variant="ghost" size="sm" onClick={handleSwitch}>
            {LOCALE_LABELS[locale as keyof typeof LOCALE_LABELS]}
        </Button>
    );
}
