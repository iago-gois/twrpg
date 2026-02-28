import { useTranslations } from "next-intl";

export default async function QuestDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const t = useTranslations("database.quests");

    return (
        <div>
            <h1 className="text-3xl font-bold">
                {t("title")}: {slug}
            </h1>
            <div className="mt-8 rounded-lg border border-dashed p-12 text-center text-muted-foreground">
                Quest detail — Coming soon
            </div>
        </div>
    );
}
