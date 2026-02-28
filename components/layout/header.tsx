import { Download } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeSwitcher } from "./theme-switcher";

export function Header() {
	const t = useTranslations("nav");

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="flex w-full h-14 items-center px-100 justify-between">
				<Link href="/" className="mr-6 flex items-center space-x-2">
					<Image
						src="/twrpg_icon_white.png"
						alt="TWRPG Icon"
						width={50}
						height={50}
						className="hidden sm:inline-block"
					/>
				</Link>

				<nav className="flex  items-center text-sm font-medium gap-8">
					<Link
						href="/"
						className="transition-colors hover:text-foreground/80 text-foreground/60"
					>
						{t("home")}
					</Link>
					<Link
						href="/"
						className="transition-colors hover:text-foreground/80 text-foreground/60"
					>
						{t("classes")}
					</Link>
					<Link
						href="/"
						className="transition-colors hover:text-foreground/80 text-foreground/60"
					>
						{t("items")}
					</Link>
					<Link
						href="/"
						className="transition-colors hover:text-foreground/80 text-foreground/60"
					>
						{t("monsters")}
					</Link>
					<Link
						href="/"
						className="transition-colors hover:text-foreground/80 text-foreground/60"
					>
						{t("bosses")}
					</Link>
					<Link
						href="/"
						className="transition-colors hover:text-foreground/80 text-foreground/60"
					>
						{t("npcs")}
					</Link>
					<Link
						href="/database/classes"
						className="transition-colors hover:text-foreground/80 text-foreground/60"
					>
						{t("guides")}
					</Link>
				</nav>

				<div className="flex items-center gap-2">
					<ThemeSwitcher />
					<LocaleSwitcher />
					<Button
						asChild
						variant="destructive"
						size="sm"
						className="inline-flex items-center gap-2 rounded-lg bg-destructive px-8 py-4 font-semibold text-destructive-foreground shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:brightness-150"
					>
						<Link href="/download">
							<Download className="h-4 w-4" />
							{t("download")}
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
