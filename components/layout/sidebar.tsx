"use client";

import { Bug, House, Menu, Package, Swords } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { SIDEBAR_SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeSwitcher } from "./theme-switcher";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  House,
  Swords,
  Package,
  Bug,
};

export function Sidebar() {
  const sidebarT = useTranslations("sidebar");
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="border-b p-4">
          <Link
            href="/"
            onClick={onNavigate}
            className="flex items-center justify-center rounded-md border bg-card p-3 transition-colors hover:bg-accent"
          >
            <Image src="/twrpg_icon_white.png" alt="TWRPG Icon" width={48} height={48} priority />
          </Link>
          <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-2">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-5 p-4">
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
                    onClick={onNavigate}
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
        <div className="border-t px-4 py-3 text-[11px] leading-relaxed text-muted-foreground">
          <p>TWRPG is a Warcraft III custom map.</p>
          <p className="mt-1 font-semibold text-foreground">This is a fan-made database.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <div className="fixed top-3 left-3 z-40 md:hidden">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon-sm" aria-label="Open sidebar">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="w-72 p-0 sm:max-w-none">
          <SidebarContent onNavigate={() => setIsMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 shrink-0 border-r md:sticky md:top-0 md:block md:h-screen">
        <SidebarContent />
      </aside>
    </>
  );
}
