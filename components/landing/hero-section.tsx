import { ChevronRight, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function HeroSection() {
	const t = useTranslations("landing");

	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
			{/* Background image */}
			<div className="absolute inset-0 z-0">
				<div
					className="h-full w-full bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: "url('/hero-bg.png')" }}
				/>
			</div>

			{/* Dark overlay */}
			<div className="absolute inset-0 z-1 bg-background/70" />

			{/* Bottom gradient fade */}
			<div className="absolute inset-0 z-2 bg-linear-to-t from-background via-background/30 to-transparent" />

			{/* Content */}
			<div className="relative z-10 mx-auto max-w-7xl px-4 text-center lg:px-8">
				{/* Server status badge */}
				<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
					<span className="relative flex h-2 w-2">
						<span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-green-400 opacity-75" />
						<span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
					</span>
					{t("serverOnline")}
				</div>

				{/* Title */}
				<h1 className="text-balance font-serif text-5xl font-bold tracking-wide text-foreground sm:text-6xl lg:text-8xl">
					THE WORLD <span className="text-primary">RPG</span>
				</h1>

				{/* Description */}
				<p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
					{t("heroDescription")}
				</p>

				{/* CTA buttons */}
				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Link
						href="/download"
						className="inline-flex items-center gap-2 rounded-lg bg-destructive px-8 py-4 font-semibold text-destructive-foreground shadow-lg shadow-destructive/20 transition-all hover:brightness-110"
					>
						<Download className="h-5 w-5" />
						{t("downloadMap")}
					</Link>
					<Link
						href="/database/classes"
						className="group inline-flex items-center gap-2 rounded-lg border border-primary/40 px-8 py-4 font-semibold text-primary transition-colors hover:bg-primary/10"
					>
						{t("browseHeroes")}
						<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
					</Link>
				</div>

				{/* Stats row */}
				<div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8">
					<div>
						<p className="font-serif text-2xl font-bold text-primary sm:text-3xl">
							50+
						</p>
						<p className="mt-1 text-sm text-muted-foreground">
							{t("statClasses")}
						</p>
					</div>
					<div>
						<p className="font-serif text-2xl font-bold text-primary sm:text-3xl">
							200+
						</p>
						<p className="mt-1 text-sm text-muted-foreground">
							{t("statItems")}
						</p>
					</div>
					<div>
						<p className="font-serif text-2xl font-bold text-primary sm:text-3xl">
							1000+
						</p>
						<p className="mt-1 text-sm text-muted-foreground">
							{t("statPlayers")}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
