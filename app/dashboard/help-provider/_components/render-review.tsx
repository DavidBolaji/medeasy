import SafeHTML from '@/app/_components/safe-html';
import Typography from '@/app/_components/typography/typography';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { Reviews } from '@prisma/client';
import { Rate } from 'antd';
import { UserIcon } from 'lucide-react';
import React from 'react';

type RenderReviewaProps = {
  review: Pick<Reviews, 'title' | 'description' | 'star'> & {
    reviewer: { fname: string; lname: string };
  };
};

const RenderReview: React.FC<RenderReviewaProps> = ({ review }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-x-2 mb-2">
        <Avatar className="w-12 h-12">
          <AvatarImage alt={`@${review.reviewer.fname}`} />
          <AvatarFallback className="bg-[#5C698A]">
            <UserIcon color="white" />
          </AvatarFallback>
        </Avatar>
        <Typography className="text-sm">
          {review.reviewer.fname} {review.reviewer.lname}
        </Typography>
      </div>
      <Rate value={review.star} allowHalf disabled />
      <Typography className="font-semibold text-black my-2">
        {review.title}
      </Typography>
      <div>
        <SafeHTML content={review.description as unknown as HTMLElement} />
      </div>
    </div>
  );
};

export default RenderReview;
