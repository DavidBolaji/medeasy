import { ReturnSingleRequestSchemaType } from '@/src/entities/models/requests';
import { ReturnSingleReviewSchemaType } from '@/src/entities/models/review';
import BackButton from '../../../../_components/back-button';
import RequestDetails from '@/app/dashboard/help-provider/_components/request-details';
import ReviewForm from './_components/review-form';
import { getSingleRequest, getSingleReview } from './action';

interface RequestPageParams {
  params: { requestId: string; userId: string };
}

export const revalidate = 0;

export default async function DashboardAccountOwnerCompletedPage({
  params,
}: RequestPageParams) {
  const requestId = (await params)?.requestId;
  const userId = (await params)?.userId;

  let singleRequest: ReturnSingleRequestSchemaType | null;
  let singleReview: ReturnSingleReviewSchemaType | null;

  try {
    const [request, review] = await Promise.all([
      getSingleRequest(requestId),
      getSingleReview(userId, requestId),
    ]);

    singleRequest = request;
    singleReview = review;
  } catch (error) {
    throw error;
  }

  return (
    <div className="">
      <div className="bg-primary h-20 sticky top-24 z-40 mb-10">
        <div className="h-20 md:px-12">
          <BackButton isCompleted />
        </div>
      </div>
      <div className="md:px-12">
        <span className="px-4 translate-x-8 inline-block py-1 border font-instrument text-sm border-green-400 text-green-400 bg-transparent rounded-full">
          Completed
        </span>
        <div className="grid gap-8 grid-cols-12 mt-4">
          <div className="md:col-span-7 col-span-12 px-8">
            <RequestDetails request={singleRequest} />
          </div>
          <div className="md:col-span-5 col-span-12 md:order-last order-first md:block md:px-0 px-4 md:mb-0 mb-2">
            <ReviewForm review={singleReview} />
          </div>
        </div>
      </div>
    </div>
  );
}
