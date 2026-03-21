import { DISCORD_SERVER_URL } from "@/lib/constants";

export const LANDING_HERO_STATS = [
  { value: "30+", labelKey: "statClasses" },
  { value: "700+", labelKey: "statItems" },
  { value: "1000+", labelKey: "statPlayers" },
] as const;

export const LANDING_NEWS_ITEMS = [
  {
    titleKey: "news1Title",
    excerptKey: "news1Excerpt",
    date: "2026-02-25",
    tagKey: "tagUpdate",
  },
  {
    titleKey: "news2Title",
    excerptKey: "news2Excerpt",
    date: "2026-02-20",
    tagKey: "tagEvent",
  },
  {
    titleKey: "news3Title",
    excerptKey: "news3Excerpt",
    date: "2026-02-15",
    tagKey: "tagGuide",
  },
] as const;

export const LANDING_QUICK_LINKS = [
  {
    icon: "Download",
    titleKey: "downloadMap",
    descriptionKey: "downloadMapDesc",
    href: "/download",
    accent: true,
  },
  {
    icon: "BookOpen",
    titleKey: "guides",
    descriptionKey: "guidesDesc",
    href: "/database/guides",
    accent: false,
  },
  {
    icon: "Trophy",
    titleKey: "builds",
    descriptionKey: "buildsDesc",
    href: "/database/builds",
    accent: false,
  },
  {
    icon: "Users",
    titleKey: "classes",
    descriptionKey: "classesDesc",
    href: "/database/classes",
    accent: false,
  },
  {
    icon: "Map",
    titleKey: "dungeons",
    descriptionKey: "dungeonsDesc",
    href: "/database/dungeons",
    accent: false,
  },
  {
    icon: "MessageCircle",
    titleKey: "discord",
    descriptionKey: "discordDesc",
    href: DISCORD_SERVER_URL,
    accent: false,
    external: true,
  },
] as const;

export type LandingQuickLink = (typeof LANDING_QUICK_LINKS)[number];
export type LandingQuickLinkIcon = LandingQuickLink["icon"];
