import { LucideQuote } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Testimonial } from '@/app/(home)/_sections/testimonials/types';
import Typography from '../../typography/typography';
import Image from 'next/image';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <Card className="min-w-[300px] max-w-[300px] rounded-2xl bg-gray-50">
      <CardContent className="p-6">
        <LucideQuote className="h-6 rotate-180 fill-[#517DF0] w-6 text-primary mb-4" />
        <Typography className="text-black mb-2 font-bold">
          {testimonial.title}
        </Typography>
        <Typography as="p" className="text-black-200 mb-8 line-clamp-4">
          {testimonial.text}
        </Typography>
        <div className="flex items-center gap-3">
          <div className="flex w-10 h-10 rounded-full items-center gap-3 relative">
            <Image
              src={testimonial.user.avatar || '/placeholder.svg'}
              alt={testimonial.user.name}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold text-sm">{testimonial.user.name}</p>
            <p className="text-xs text-gray-500">
              {testimonial.user.role} at {testimonial.user.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
