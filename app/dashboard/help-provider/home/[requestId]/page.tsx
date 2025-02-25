import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import BackButton from '../_components/back-button';
import RequestDetails from '../../_components/request-details';
import BidForm from '../_components/bid-form';
import { ReturnSingleRequestSchemaType } from '@/src/entities/models/requests';
import { getSingleRequest } from '../action';

interface RequestPageParams {
  params: { requestId: string };
}

export const revalidate = 0;

export default async function DashboardHelpProviderRequestPage({
  params,
}: RequestPageParams) {
  const requestId = (await params)?.requestId;

  let singleRequest: ReturnSingleRequestSchemaType | null;

  try {
    const request = await getSingleRequest(requestId);
    singleRequest = request;
  } catch (error) {
    throw error;
  }

  return (
    <div className="">
      <div className="bg-primary h-20 sticky top-24 z-40">
        <div className="h-20 md:px-12">
          <BackButton />
        </div>
      </div>
      <div className="md:px-12">
        <div className="grid gap-8 grid-cols-12 mt-16">
          <div className="md:col-span-7 col-span-12 px-8">
            <RequestDetails request={singleRequest} singlePage />
          </div>
          <div className="md:col-span-5 col-span-12 md:order-last order-first md:block md:px-0 px-4 md:mb-0 mb-2">
            <BidForm
              price={singleRequest?.price}
              negotiable={singleRequest?.negotiable || false}
              job={singleRequest?.title || ''}
              requestUserId={singleRequest?.user.id || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
