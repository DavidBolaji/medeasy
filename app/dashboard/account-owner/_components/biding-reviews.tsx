import { RequestBiderSchemaType } from '@/src/entities/models/bid';
import { Empty } from 'antd';
import React from 'react';
import RenderReview from '../../help-provider/_components/render-review';

interface BidingReviewsProps {
  bider: RequestBiderSchemaType;
}

const BidingReviews: React.FC<BidingReviewsProps> = ({ bider }) => {
  if (bider?.user?.receivedReview?.length < 1) {
    return (
      <div className="h-full flex items-center w-full justify-center">
        <Empty />
      </div>
    );
  }
  return (
    <div>
      {bider?.user.receivedReview.map((review, ind) => (
        <div key={ind} className="space-y-6">
          <RenderReview review={review} />
        </div>
      ))}
    </div>
  );
};

export default BidingReviews;
