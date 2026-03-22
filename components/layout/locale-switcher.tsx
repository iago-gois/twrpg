"use client";

import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = [
  { value: "en", label: "🇺🇸 EN" },
  { value: "pt", label: "🇧🇷 PT" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleSwitch(nextLocale: string) {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <Select value={locale} onValueChange={handleSwitch}>
      <SelectTrigger size="sm" aria-label="Select language" className="min-w-[7rem]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent align="end">
        {LOCALES.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
