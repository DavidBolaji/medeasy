'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';

interface AutoScrollingCarouselProps {
  children: ReactNode[];
  direction?: 'left' | 'right';
  speed?: number;
}

export function AutoScrollingCarousel({
  children,
  direction = 'left',
  speed = 1,
}: AutoScrollingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // **Duplicate the children to create a seamless loop**
  const duplicatedChildren = [...children, ...children];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!scrollContainer) return;

      if (!isPaused) {
        const scrollAmount = direction === 'left' ? speed : -speed;
        scrollContainer.scrollLeft += scrollAmount;

        // **Reset scroll position when reaching the duplicated content**
        const scrollWidth = scrollContainer.scrollWidth / 2; // Half the content (actual children length)
        if (direction === 'left' && scrollContainer.scrollLeft >= scrollWidth) {
          scrollContainer.scrollLeft -= scrollWidth;
        } else if (direction === 'right' && scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft += scrollWidth;
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, isPaused, speed]);

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="flex overflow-x-auto scrollbar-hide gap-4 py-4"
      style={{ scrollBehavior: 'auto' }}
    >
      {duplicatedChildren.map((child, index) => (
        <div key={index} className="inline-block">
          {child}
        </div>
      ))}
    </div>
  );
}
