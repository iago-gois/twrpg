"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { DATABASE_SECTIONS } from "@/lib/constants";
import {
    Swords,
    Hammer,
    Package,
    ScrollText,
    Zap,
    Bug,
    Skull,
    Castle,
    Users,
    MapPin,
    BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Swords,
    Hammer,
    Package,
    ScrollText,
    Zap,
    Bug,
    Skull,
    Castle,
    Users,
    MapPin,
    BookOpen,
};

export function Sidebar() {
    const t = useTranslations("nav");
    const pathname = usePathname();

    return (
        <aside className="w-56 shrink-0 border-r">
            <nav className="flex flex-col gap-1 p-4">
                {DATABASE_SECTIONS.map((section) => {
                    const Icon = iconMap[section.icon];
                    const href = `/database/${section.key}`;
                    const isActive = pathname.startsWith(href);

                    return (
                        <Link
                            key={section.key}
                            href={href}
                            className={cn(
                                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                isActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground",
                            )}
                        >
                            {Icon && <Icon className="h-4 w-4" />}
                            {t(section.key)}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
