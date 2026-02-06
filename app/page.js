import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import SpecialOffersSection from '@/components/SpecialOffersSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ProductShowcase />
      <SpecialOffersSection />
      <BenefitsSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </main>
  );
}
