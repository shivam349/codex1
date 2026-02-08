import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import ProductShowcase from '@/components/ProductShowcase';
import SpecialOffersSection from '@/components/SpecialOffersSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ProductShowcase />
      <BenefitsSection />
      <TestimonialSection />
      <CTABanner />
      <Footer />
    </main>
  );
}
