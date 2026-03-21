import { BookOpen, Download, Map as MapIcon, MessageCircle, Trophy, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { LANDING_QUICK_LINKS, type LandingQuickLinkIcon } from "@/features/landing/content";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const QUICK_LINK_ICON_MAP: Record<LandingQuickLinkIcon, ComponentType<{ className?: string }>> = {
  BookOpen,
  Download,
  Map: MapIcon,
  MessageCircle,
  Trophy,
  Users,
};

function QuickLinkCard({
  icon: Icon,
  title,
  description,
  accent,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-xl border p-5 text-left transition-colors",
        accent
          ? "border-destructive/40 bg-destructive/10 hover:border-destructive"
          : "border-border bg-card hover:border-primary/40 hover:bg-secondary",
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
          accent
            ? "bg-destructive/20 text-destructive"
            : "border border-primary/40 bg-primary/10 text-primary",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-serif font-bold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function QuickLinks() {
  const t = useTranslations("landing.quickLinks");

  return (
    <section className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
        {/* Section header */}
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{t("label")}</p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">{t("title")}</h2>

        {/* Links grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_QUICK_LINKS.map((link) => {
            const Icon = QUICK_LINK_ICON_MAP[link.icon];
            const cardContent = (
              <QuickLinkCard
                icon={Icon}
                title={t(link.titleKey)}
                description={t(link.descriptionKey)}
                accent={link.accent}
              />
            );

            if ("external" in link && link.external) {
              return (
                <a key={link.titleKey} href={link.href} target="_blank" rel="noopener noreferrer">
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
