import { useTranslations } from "next-intl";

export default function DungeonsPage() {
    const t = useTranslations("database.dungeons");

    return (
        <div>
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="mt-2 text-muted-foreground">{t("description")}</p>
            <div className="mt-8 rounded-lg border border-dashed p-12 text-center text-muted-foreground">
                {t("title")} — Coming soon
            </div>
        </div>
    );
}
