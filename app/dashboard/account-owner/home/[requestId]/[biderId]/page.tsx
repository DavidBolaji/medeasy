import { ReturnSingleRequestSchemaType } from '@/src/entities/models/requests';
import BackButton from '../../../_components/back-button';
import { getRequestBiders, getSingleRequest } from '../page';
import RequestDetails from '@/app/dashboard/help-provider/_components/request-details';
import PaymentCard from '@/app/_components/card/payment-card';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';

interface RequestPageParams {
  params: { requestId: string };
}

export const revalidate = 0;

export default async function DashboardAccountOwnerAcceptRequestPage({
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
      <div className="md:px-12 pb-20">
        <div className="grid gap-8 grid-cols-12 mt-16">
          <div className="lg:col-span-7 col-span-12 px-8">
            <RequestDetails request={singleRequest} biders={requestBiders} />
          </div>
          <div className="lg:col-span-5 col-span-12 px-8">
            <PaymentCard biders={requestBiders} request={singleRequest} />
          </div>
        </div>
      </div>
    </div>
  );
}
