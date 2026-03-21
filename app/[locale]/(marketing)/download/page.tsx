import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DownloadPage() {
  const t = useTranslations("download");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("description")}</p>

      <Card className="mt-8 max-w-lg">
        <CardHeader>
          <CardTitle>{t("latestVersion")}</CardTitle>
          <CardDescription>TWRPG v?.?.? — Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled>{t("downloadButton")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
