import { Hero } from "@/components/home/Hero";
import { WhyUs } from "@/components/home/WhyUs";
import { Counters } from "@/components/home/Counters";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { CTABanner } from "@/components/sections/CTABanner";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Counters />
      <ServicesPreview />
      <AboutTeaser />
      <section className="bg-brand-dark py-20">
        <Container>
          <SectionHeading
            eyebrow="Confían en Nosotros"
            title="Instituciones que respaldan nuestro trabajo"
            align="center"
            light
          />
        </Container>
        <div className="mt-12">
          <ClientsMarquee />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
