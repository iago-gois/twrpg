"use client";

import { Bug, House, Package, Swords } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { SIDEBAR_SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  House,
  Swords,
  Package,
  Bug,
};

export function Sidebar() {
  const sidebarT = useTranslations("sidebar");
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r">
      <nav className="flex flex-col gap-5 p-4">
        {SIDEBAR_SECTIONS.map((section) => (
          <div key={section.id} className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {sidebarT(section.titleKey)}
            </p>
            {section.items.map((item) => {
              const Icon = iconMap[item.icon];
              const isHomeItem = item.href === "/";
              const isActive = isHomeItem ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {sidebarT(item.key)}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
