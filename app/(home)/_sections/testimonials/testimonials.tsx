import { AutoScrollingCarousel } from '@/app/_components/auto-scrolling';
import Typography from '@/app/_components/typography/typography';
import React from 'react';
import { testimonials } from './data';
import TestimonialCard from '@/app/_components/card/testimonial/testimonial-card';

const TestimonialsSection = () => {
  return (
    <div className="py-24 bg-white">
      <Typography as="h2" align="center" className="mb-10">
        What Our Users Are Saying
      </Typography>

      <AutoScrollingCarousel speed={1}>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </AutoScrollingCarousel>
      <AutoScrollingCarousel speed={1} direction="right">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </AutoScrollingCarousel>
    </div>
  );
};

export default TestimonialsSection;
