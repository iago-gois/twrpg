import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("home");
  const sidebar = useTranslations("sidebar");

  return (
    <div>
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("description")}</p>

      <div className="mt-8 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">{t("exploreDatabase")}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/database/classes"
            className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            {sidebar("classes")}
          </Link>
          <Link
            href="/database/items"
            className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            {sidebar("items")}
          </Link>
          <Link
            href="/database/monsters"
            className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            {sidebar("monsters")}
          </Link>
        </div>
      </div>
    </div>
  );
}
