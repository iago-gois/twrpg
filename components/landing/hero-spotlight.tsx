"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Shield, Zap, Swords, ChevronLeft, ChevronRight } from "lucide-react";

const HEROES = [
    {
        nameKey: "paladin",
        roleKey: "tank",
        descriptionKey: "paladinDesc",
        icon: Shield,
        color: "from-neutral-800/60",
        stats: { strength: 90, agility: 30, intellect: 50 },
    },
    {
        nameKey: "archmage",
        roleKey: "mage",
        descriptionKey: "archmageDesc",
        icon: Zap,
        color: "from-neutral-700/60",
        stats: { strength: 20, agility: 40, intellect: 95 },
    },
    {
        nameKey: "ranger",
        roleKey: "dps",
        descriptionKey: "rangerDesc",
        icon: Swords,
        color: "from-neutral-600/60",
        stats: { strength: 40, agility: 95, intellect: 35 },
    },
    {
        nameKey: "berserker",
        roleKey: "melee",
        descriptionKey: "berserkerDesc",
        icon: Swords,
        color: "from-neutral-900/60",
        stats: { strength: 95, agility: 60, intellect: 15 },
    },
];

export function HeroSpotlight() {
    const [activeIndex, setActiveIndex] = useState(0);
    const t = useTranslations("landing.spotlight");
    const hero = HEROES[activeIndex];
    const Icon = hero.icon;

    const prev = () =>
        setActiveIndex((i) => (i - 1 + HEROES.length) % HEROES.length);
    const next = () => setActiveIndex((i) => (i + 1) % HEROES.length);

    return (
        <section className="py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Section header */}
                <div className="mb-12 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                        {t("label")}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                        {t("title")}
                    </h2>
                </div>

                {/* Two-column grid */}
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                    {/* Left: Hero portrait */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card">
                        {/* Gradient placeholder for hero image */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t ${hero.color} to-transparent transition-all duration-700`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="h-32 w-32 text-primary/30" />
                        </div>

                        {/* Bottom gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />

                        {/* Navigation arrows */}
                        <div className="absolute bottom-4 left-4 flex gap-2">
                            <button
                                onClick={prev}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={next}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Counter badge */}
                        <div className="absolute bottom-4 right-4 rounded-full border border-border bg-card/80 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
                            {activeIndex + 1} / {HEROES.length}
                        </div>
                    </div>

                    {/* Right: Hero info */}
                    <div>
                        {/* Icon badge */}
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>

                        <h3 className="font-serif text-2xl font-bold lg:text-3xl">
                            {t(hero.nameKey)}
                        </h3>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-accent">
                            {t(hero.roleKey)}
                        </p>
                        <p className="mt-4 leading-relaxed text-muted-foreground">
                            {t(hero.descriptionKey)}
                        </p>

                        {/* Stat bars card */}
                        <div className="mt-8 rounded-xl border border-border bg-card p-5">
                            {(
                                [
                                    ["strength", hero.stats.strength],
                                    ["agility", hero.stats.agility],
                                    ["intellect", hero.stats.intellect],
                                ] as const
                            ).map(([label, value]) => (
                                <div
                                    key={label}
                                    className="mb-3 flex items-center gap-3 last:mb-0"
                                >
                                    <span className="w-20 text-sm text-muted-foreground capitalize">
                                        {t(label)}
                                    </span>
                                    <div className="flex-1 rounded-full bg-secondary">
                                        <div
                                            className="h-2 rounded-full bg-primary transition-all duration-700"
                                            style={{ width: `${value}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-right font-serif text-sm font-bold text-primary">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Dot navigation */}
                        <div className="mt-6 flex items-center gap-2">
                            {HEROES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`h-2 rounded-full transition-all ${
                                        i === activeIndex
                                            ? "w-8 bg-primary"
                                            : "w-2 bg-border hover:bg-muted-foreground"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
