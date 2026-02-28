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

export const DATABASE_SECTIONS = [
    { key: "classes", icon: "Swords" },
    { key: "builds", icon: "Hammer" },
    { key: "items", icon: "Package" },
    { key: "recipes", icon: "ScrollText" },
    { key: "skills", icon: "Zap" },
    { key: "monsters", icon: "Bug" },
    { key: "bosses", icon: "Skull" },
    { key: "dungeons", icon: "Castle" },
    { key: "npcs", icon: "Users" },
    { key: "quests", icon: "MapPin" },
    { key: "guides", icon: "BookOpen" },
] as const;

export type DatabaseSection = (typeof DATABASE_SECTIONS)[number]["key"];
