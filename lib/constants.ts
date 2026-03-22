export const SITE_NAME = "TWRPG Database";
export const SITE_DESCRIPTION =
  "Complete database for The World RPG — classes, items, and monsters.";

export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const SIDEBAR_SECTIONS = [
  {
    id: "home",
    titleKey: "sectionHome",
    items: [{ key: "home", icon: "House", href: "/" }],
  },
  {
    id: "database",
    titleKey: "sectionDatabase",
    items: [
      { key: "classes", icon: "Swords", href: "/database/classes" },
      { key: "items", icon: "Package", href: "/database/items" },
      { key: "monsters", icon: "Bug", href: "/database/monsters" },
    ],
  },
] as const;

export type SidebarSection = (typeof SIDEBAR_SECTIONS)[number];
export type SidebarItem = SidebarSection["items"][number];
