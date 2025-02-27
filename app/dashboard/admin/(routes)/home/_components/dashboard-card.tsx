import Typography from '@/app/_components/typography/typography';
import { Card, CardContent } from '@/app/_components/ui/card';
import React, { ComponentType, ReactNode } from 'react';

interface DashboardcardProps {
  icon: ComponentType<{ color?: string }>;
  title: string;
  value: string;
}

export const Dashboardcard: React.FC<DashboardcardProps> = ({
  icon: Icon,
  title,
  value,
}) => {
  return (
    <Card className="h-40 rounded-2xl bg-[#F1F5F7] border border-[#DDEEE5] py-6">
      <CardContent>
        <div className="bg-[#141923] mb-2 flex items-center justify-center w-10 h-10 rounded-xl">
          <Icon color="white" />
        </div>
        <Typography as="p" className="black-300 text-sm font-light">
          {title}
        </Typography>
        <Typography className="black-100 font-medium text-2xl leading-8 pt-2 tracking-wide">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
