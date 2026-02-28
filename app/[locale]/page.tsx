import { HeroSection } from "@/components/landing/hero-section";
import { HeroSpotlight } from "@/components/landing/hero-spotlight";
import { NewsSection } from "@/components/landing/news-section";
import { QuickLinks } from "@/components/landing/quick-links";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <HeroSection />
            <HeroSpotlight />
            <NewsSection />
            <QuickLinks />
        </div>
    );
}
