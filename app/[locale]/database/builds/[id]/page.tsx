import { useTranslations } from "next-intl";

export default async function BuildDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const t = useTranslations("database.builds");

    return (
        <div>
            <h1 className="text-3xl font-bold">
                {t("title")}: {id}
            </h1>
            <div className="mt-8 rounded-lg border border-dashed p-12 text-center text-muted-foreground">
                Build detail — Coming soon
            </div>
        </div>
    );
}
