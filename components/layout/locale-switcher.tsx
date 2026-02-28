"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { LOCALES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

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
            {locale === "en" ? "PT" : "EN"}
        </Button>
    );
}
