import HeroCarousel from "@/components/home/HeroCarousel";
import ExpertiseList from "@/components/home/ExpertiseList";
import ImpactStats from "@/components/home/ImpactStats";
import FeaturedStory from "@/components/home/FeaturedStory";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import CareersBand from "@/components/home/CareersBand";
import CtaBand from "@/components/home/CtaBand";

// Homepage — Direction B (2026-07 design handoff), top to bottom:
// hero carousel (+ insight index inside HeroCarousel) → expertise rows →
// impact stats → featured split → industries grid → careers band → CTA band. The
// TransparencyBand + Footer come from the root layout.
export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ExpertiseList />
      <ImpactStats />
      <FeaturedStory />
      <IndustriesGrid />
      <CareersBand />
      <CtaBand />
    </>
  );
}
