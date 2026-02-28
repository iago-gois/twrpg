import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
    Download,
    BookOpen,
    Trophy,
    Users,
    Map,
    MessageCircle,
} from "lucide-react";
import { DISCORD_SERVER_URL } from "@/lib/constants";

const LINKS = [
    {
        icon: Download,
        titleKey: "downloadMap",
        descriptionKey: "downloadMapDesc",
        href: "/download",
        accent: true,
    },
    {
        icon: BookOpen,
        titleKey: "guides",
        descriptionKey: "guidesDesc",
        href: "/database/guides",
        accent: false,
    },
    {
        icon: Trophy,
        titleKey: "builds",
        descriptionKey: "buildsDesc",
        href: "/database/builds",
        accent: false,
    },
    {
        icon: Users,
        titleKey: "classes",
        descriptionKey: "classesDesc",
        href: "/database/classes",
        accent: false,
    },
    {
        icon: Map,
        titleKey: "dungeons",
        descriptionKey: "dungeonsDesc",
        href: "/database/dungeons",
        accent: false,
    },
    {
        icon: MessageCircle,
        titleKey: "discord",
        descriptionKey: "discordDesc",
        href: "external",
        accent: false,
    },
];

export function QuickLinks() {
    const t = useTranslations("landing.quickLinks");

    return (
        <section className="border-t border-border py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
                {/* Section header */}
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {t("label")}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                    {t("title")}
                </h2>

                {/* Links grid */}
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {LINKS.map((link) => {
                        const Icon = link.icon;
                        const isExternal = link.href === "external";

                        const cardContent = (
                            <div
                                className={`flex items-start gap-4 rounded-xl border p-5 text-left transition-colors ${
                                    link.accent
                                        ? "border-destructive/40 bg-destructive/10 hover:border-destructive"
                                        : "border-border bg-card hover:border-primary/40 hover:bg-secondary"
                                }`}
                            >
                                <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                                        link.accent
                                            ? "bg-destructive/20 text-destructive"
                                            : "border border-primary/40 bg-primary/10 text-primary"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold">
                                        {t(link.titleKey)}
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {t(link.descriptionKey)}
                                    </p>
                                </div>
                            </div>
                        );

                        if (isExternal) {
                            return (
                                <a
                                    key={link.titleKey}
                                    href={DISCORD_SERVER_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {cardContent}
                                </a>
                            );
                        }

                        return (
                            <Link key={link.titleKey} href={link.href}>
                                {cardContent}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
