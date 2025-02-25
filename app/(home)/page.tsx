import HelpSection from './_sections/help/help';
import HeroSection from './_sections/hero/hero-section';
import StepSection from './_sections/steps-section/step-section';
import TestimonialsSection from './_sections/testimonials/testimonials';

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <StepSection />
      <HelpSection />
      <TestimonialsSection />
    </main>
  );
}
