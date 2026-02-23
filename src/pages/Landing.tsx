import { PublicLayout } from '@/components/layout/PublicLayout';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { SolutionSection } from '@/components/landing/SolutionSection';
import { SubjectsSection } from '@/components/landing/SubjectsSection';
import { MarketSection } from '@/components/landing/MarketSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FoundersSection } from '@/components/landing/FoundersSection';
import { CTASection } from '@/components/landing/CTASection';

const Landing = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <SubjectsSection />
      <MarketSection />
      <PricingSection />
      <FoundersSection />
      <CTASection />
    </PublicLayout>
  );
};

export default Landing;
