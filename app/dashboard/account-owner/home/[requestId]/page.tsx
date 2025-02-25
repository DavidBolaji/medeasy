import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ReturnSingleRequestSchemaType } from '@/src/entities/models/requests';
import RequestDetails from '@/app/dashboard/help-provider/_components/request-details';

import { RequestBiderSchemaType } from '@/src/entities/models/bid';
import OfferCard from '@/app/_components/card/offer-card';
import BackButton from '../../_components/back-button';
import Typography from '@/app/_components/typography/typography';
import AcceptOfferModal from '../../_components/modal/accept-offer-modal';
import AcceptOfferDrawer from '../../_components/modal/accept-offer-drawer';

interface RequestPageParams {
  params: { requestId: string };
}

export const revalidate = 0;

export async function getSingleRequest(id: string) {
  unstable_noStore(); // Opt out of static rendering
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getSingleRequestController = getInjection(
      'IGetSingleRequestController'
    );
    return await getSingleRequestController(id, sessionId);
  } catch (error) {
    if (
      error instanceof UnauthenticatedError ||
      error instanceof AuthenticationError
    ) {
      redirect('/start/help-provider/sign-in');
    }
    throw error;
  }
}

export async function getRequestBiders(requestId: string) {
  unstable_noStore(); // Opt out of static rendering
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getBidersForRequestController = getInjection(
      'IGetBidersForRequestController'
    );
    return await getBidersForRequestController(requestId, sessionId);
  } catch (error) {
    if (
      error instanceof UnauthenticatedError ||
      error instanceof AuthenticationError
    ) {
      redirect('/start/help-provider/sign-in');
    }
    throw error;
  }
}

export default async function DashboardAccountOwnerRequestPage({
  params,
}: RequestPageParams) {
  const requestId = (await params)?.requestId;

  let singleRequest: ReturnSingleRequestSchemaType | null;
  let requestBiders: RequestBiderSchemaType[] | [];

  try {
    const [request, biders] = await Promise.all([
      getSingleRequest(requestId),
      getRequestBiders(requestId),
    ]);

    singleRequest = request;
    requestBiders = biders;
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
          <div className="lg:col-span-7 col-span-12 px-8">
            <RequestDetails request={singleRequest} />
          </div>
        </div>

        <div className="mt-20 px-5 mb-8">
          <Typography as="h4" className="text-2xl font-bold ">
            You have {requestBiders.length || 0}{' '}
            {requestBiders.length > 1 ? 'offers' : 'offer'} for your request
          </Typography>
        </div>
        <div className="grid lg:grid-cols-6 gap-x-4 px-4 pb-20">
          {requestBiders.map((bider, ind) => (
            <div key={ind} className="col-span-2">
              <OfferCard bider={bider} />
            </div>
          ))}
        </div>
      </div>
      <AcceptOfferDrawer
        biders={requestBiders}
        requestPrice={singleRequest?.price || ''}
        job={singleRequest?.title || ''}
      />
      <AcceptOfferModal
        biders={requestBiders}
        requestPrice={singleRequest?.price || ''}
        job={singleRequest?.title || ''}
      />
    </div>
  );
}
