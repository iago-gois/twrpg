import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
    DATABASE_SECTIONS,
    MAP_DOWNLOAD_PATH,
    MAP_PREVIEW_IMAGE,
    MAP_VERSION,
    DISCORD_SERVER_URL,
    DISCORD_ADMIN_HANDLES,
} from "@/lib/constants";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
    const t = useTranslations();
    const quickAccessSections = DATABASE_SECTIONS.filter((section) =>
        [
            "monsters",
            "builds",
            "items",
            "recipes",
            "classes",
            "skills",
        ].includes(section.key),
    );
    const guideSections = DATABASE_SECTIONS.filter((section) =>
        ["bosses", "dungeons", "quests", "guides"].includes(section.key),
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <section className="mb-12">
                <Card className="overflow-hidden border-border/80">
                    <div className="grid gap-0 md:grid-cols-2">
                        <div className="relative min-h-64 bg-muted/40 md:min-h-full">
                            <Image
                                src={MAP_PREVIEW_IMAGE}
                                alt={t("home.mapPreview")}
                                fill
                                className="object-contain p-10"
                                priority
                            />
                        </div>
                        <div className="p-6 md:p-8">
                            <Badge variant="secondary">
                                {t("home.generalInfo")}
                            </Badge>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                {t("home.title")}
                            </h1>
                            <p className="mt-3 text-muted-foreground">
                                {t("home.subtitle")}
                            </p>
                            <p className="mt-1 text-muted-foreground">
                                {t("home.description")}
                            </p>

                            <div className="mt-6 rounded-lg border bg-muted/30 p-4">
                                <p className="text-sm text-muted-foreground">
                                    {t("home.mapVersion")}
                                </p>
                                <p className="text-2xl font-semibold">
                                    TWRPG {MAP_VERSION}
                                </p>
                            </div>

                            <div className="mt-6">
                                <Button asChild size="lg">
                                    <Link href={MAP_DOWNLOAD_PATH}>
                                        {t("home.downloadMap")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-semibold">
                    {t("home.quickLinks")}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {quickAccessSections.map((section) => (
                        <Link
                            key={section.key}
                            href={`/database/${section.key}`}
                        >
                            <Card className="h-full transition-colors hover:bg-accent/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        {t(`database.${section.key}.title`)}
                                    </CardTitle>
                                    <CardDescription>
                                        {t(
                                            `database.${section.key}.description`,
                                        )}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-semibold">
                    {t("home.guidesAndStrategies")}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {guideSections.map((section) => (
                        <Link
                            key={section.key}
                            href={`/database/${section.key}`}
                        >
                            <Card className="h-full border-border/80 transition-colors hover:bg-accent/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        {t(`database.${section.key}.title`)}
                                    </CardTitle>
                                    <CardDescription>
                                        {t(
                                            `database.${section.key}.description`,
                                        )}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-semibold">
                    {t("home.community")}
                </h2>
                <Card>
                    <CardHeader>
                        <CardTitle>{t("home.joinDiscord")}</CardTitle>
                        <CardDescription>
                            Stay in touch with announcements, events and
                            support.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Button asChild>
                                <a
                                    href={DISCORD_SERVER_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Discord
                                </a>
                            </Button>
                        </div>

                        <div>
                            <p className="mb-2 font-medium">
                                {t("home.adminContacts")}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {DISCORD_ADMIN_HANDLES.map((handle) => (
                                    <Badge key={handle} variant="outline">
                                        {handle}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
