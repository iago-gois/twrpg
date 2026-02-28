import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DATABASE_SECTIONS } from "@/lib/constants";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    const t = useTranslations();

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero */}
            <section className="mb-16 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {t("home.title")}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    {t("home.subtitle")}
                </p>
                <p className="mt-2 text-muted-foreground">
                    {t("home.description")}
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/database/classes">
                            {t("home.exploreDatabase")}
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/download">{t("home.downloadMap")}</Link>
                    </Button>
                </div>
            </section>

            {/* Database sections grid */}
            <section>
                <h2 className="mb-6 text-2xl font-semibold">
                    {t("home.quickLinks")}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {DATABASE_SECTIONS.map((section) => (
                        <Link
                            key={section.key}
                            href={`/database/${section.key}`}
                        >
                            <Card className="transition-colors hover:bg-accent/50">
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
        </div>
    );
}
