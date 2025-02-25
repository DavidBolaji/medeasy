import { ReturnAllRequestSchemaType } from '@/src/entities/models/requests';
import { Empty } from 'antd';
import React from 'react';
import RenderReview from './render-review';

interface RequestReviewsProps {
  requests: ReturnAllRequestSchemaType | null;
}

const RequestReviews: React.FC<RequestReviewsProps> = ({ requests }) => {
  const isEmpty = !Boolean(requests?.user?.reviews?.length);

  if (isEmpty) {
    return <Empty className="mt-20" />;
  }
  return (
    <div>
      {requests?.user.reviews.map((review, ind) => (
        <div key={ind} className="space-y-6">
          <RenderReview review={review} />
        </div>
      ))}
    </div>
  );
};

export default RequestReviews;
