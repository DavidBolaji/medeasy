import { cn } from '@/app/_lib/utils';
import React, { HTMLAttributes, ReactNode } from 'react';

type headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: headings;
  align?: 'left' | 'center' | 'right';
  children: ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  as = 'h4',
  children,
  className,
  align,
}) => {
  const TypographyTag = as;
  const tStyle = cn(
    `font-instrument`,
    {
      'text-left': align === 'left',
      'text-right': align === 'right',
      'text-center': align === 'center',
    },
    {
      'font-bold text-6xl': as === 'h1',
      'font-bold lg:text-5xl text-2xl ': as === 'h2',
      'font-bold lg:text-4xl text-2xl ': as === 'h3',
      'text-[#5C698A] font-medium': as === 'p',
    },
    className
  );
  return <TypographyTag className={tStyle}>{children}</TypographyTag>;
};

export default Typography;
