
import HeroSection from '@/components/cauders/HeroSection';
import PortfolioPreview from '@/components/cauders/PortfolioPreview';
import CtaSection from '@/components/cauders/CtaSection';
import AboutSection from '@/components/cauders/AboutSection';
import DesktopView from '@/components/cauders/DesktopView';

export default function PortfolioPage() {
  return (
    <DesktopView>
        <section className="h-screen flex items-center justify-center">
            <HeroSection />
        </section>
        <section className="flex items-center justify-center">
            <AboutSection />
        </section>
        <section id="portfolio-preview" className="h-screen flex items-center justify-center w-full">
            <PortfolioPreview />
        </section>
        <section className="h-screen flex items-center justify-center">
            <CtaSection />
        </section>
    </DesktopView>
  );
}
