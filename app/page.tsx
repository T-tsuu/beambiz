import FeatureGrid from "@/components/FeatureGrid";
import FinalCTA from "@/components/FinalCTA";
import FooterMinimal from "@/components/FooterMinimal";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MetricsBand from "@/components/MetricsBand";
import Nav from "@/components/Nav";
import PricingTiers from "@/components/PricingTiers";
import Proof from "@/components/Proof";
import VariantLab from "@/components/VariantLab";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <VariantLab />
        <FeatureGrid />
        <MetricsBand />
        <HowItWorks />
        <PricingTiers />
        <FinalCTA />
      </main>
      <FooterMinimal />
    </>
  );
}
