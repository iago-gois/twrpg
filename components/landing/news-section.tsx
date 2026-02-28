import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Clock, ArrowRight } from "lucide-react";

const NEWS_ITEMS = [
	{
		titleKey: "news1Title",
		excerptKey: "news1Excerpt",
		date: "2026-02-25",
		tagKey: "tagUpdate",
	},
	{
		titleKey: "news2Title",
		excerptKey: "news2Excerpt",
		date: "2026-02-20",
		tagKey: "tagEvent",
	},
	{
		titleKey: "news3Title",
		excerptKey: "news3Excerpt",
		date: "2026-02-15",
		tagKey: "tagGuide",
	},
];

export function NewsSection() {
	const t = useTranslations("landing.news");

	return (
		<section className="border-t border-border py-20 lg:py-28">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				{/* Section header */}
				<div className="mb-12 flex items-end justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-widest text-primary">
							{t("label")}
						</p>
						<h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
							{t("title")}
						</h2>
					</div>
					<Link
						href="/database/guides"
						className="group hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent sm:inline-flex"
					>
						{t("viewAll")}
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
					</Link>
				</div>

				{/* News cards grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{NEWS_ITEMS.map((item, i) => (
						<article
							key={i}
							className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
						>
							{/* Image placeholder */}
							<div className="relative aspect-[16/9] overflow-hidden bg-secondary">
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent transition-transform duration-500 group-hover:scale-105" />
								{/* Tag badge */}
								<span className="absolute left-3 top-3 rounded-md bg-primary/90 px-2.5 py-1 text-xs font-semibold text-primary-foreground">
									{t(item.tagKey)}
								</span>
							</div>

							{/* Content */}
							<div className="p-5">
								<div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
									<Clock className="h-3 w-3" />
									{item.date}
								</div>
								<h3 className="font-serif text-lg font-bold">
									{t(item.titleKey)}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{t(item.excerptKey)}
								</p>
								<span className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent">
									{t("readMore")}
									<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
								</span>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
