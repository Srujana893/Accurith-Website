import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

// Placeholder — replaced by the full 9-section Home page (V07–V14).
export default function HomePage() {
  return (
    <Section tone="white" hairline={false} dotGrid>
      <Container>
        <h1 className="max-w-3xl text-4xl leading-tight tracking-tight md:text-6xl">
          Audit, secure, and automate — with confidence
        </h1>
        <div className="mt-8">
          <Button href="/contact" size="lg">
            Book a Consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
