import { getSingleRequest } from '@/app/dashboard/help-provider/home/action';
import { Crumb } from '../../_components/crumb/crumb';
import TopBar from './_components/top-bar';
import { getRequestBiders } from '@/app/dashboard/account-owner/home/[requestId]/page';
import RenderTabs from './_components/render-tabs';
import AcceptOfferDrawer from '@/app/dashboard/account-owner/_components/modal/accept-offer-drawer';
import AcceptOfferModal from '@/app/dashboard/account-owner/_components/modal/accept-offer-modal';
import { Stage } from '@prisma/client';
import { CancelRequestModal } from './_components/cancel-request-modal';

interface ManageUserPageParams {
  params: { requestId: string };
}
export const revalidate = 0;

export default async function ViewUserPage({ params }: ManageUserPageParams) {
  const id = params.requestId;

  const [request, biders] = await Promise.all([
    getSingleRequest(id),
    getRequestBiders(id),
  ]);

  return (
    <div className="bg-grey-200">
      <div className="lg:px-12 px-2 my-2">
        <Crumb
          crumbData={[
            {
              text: 'Help Requests',
              href: '/dashboard/admin/help-requests',
            },
            {
              text: `${request?.title} `,
              href: '',
            },
          ]}
        />
      </div>
      <TopBar request={request?.stage as Stage} />
      <div className="lg:px-12">
        <RenderTabs requests={request} biders={biders} />
      </div>
      <AcceptOfferDrawer
        biders={biders}
        requestPrice={request?.price || ''}
        job={request?.title || ''}
        show={false}
      />
      <AcceptOfferModal
        biders={biders}
        requestPrice={request?.price || ''}
        job={request?.title || ''}
        show={false}
      />
      <CancelRequestModal />
    </div>
  );
}
