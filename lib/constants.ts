export const SITE_NAME = "TWRPG Database";
export const SITE_DESCRIPTION =
  "Complete database for The World RPG — classes, items, builds, monsters, dungeons, and more.";

export const MAP_VERSION = "v?.?.?";
export const MAP_PREVIEW_IMAGE = "/globe.svg";
export const MAP_DOWNLOAD_PATH = "/download";

export const DISCORD_SERVER_URL = "https://discord.gg/twrpg";
export const DISCORD_ADMIN_HANDLES = ["@TWRPG_Admin", "@Iago"] as const;

export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const PRIMARY_NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "classes", href: "/database/classes" },
  { key: "items", href: "/database/items" },
  { key: "monsters", href: "/database/monsters" },
  { key: "bosses", href: "/database/bosses" },
  { key: "npcs", href: "/database/npcs" },
  { key: "guides", href: "/database/guides" },
] as const;

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
