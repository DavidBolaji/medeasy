'use client';
import { Button } from '@/app/_components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="h-full flex items-center">
      <Button
        onClick={() => router.back()}
        className="flex items-center h-full border-0 text-white"
      >
        <ChevronLeft />
        <span>Back</span>
      </Button>
    </div>
  );
};

export default BackButton;
