import { Crumb } from '../../../_components/crumb/crumb';
import {
  getDetailsWithId,
  getPaymentWithId,
  getServiceWithId,
  getVerificationWithId,
  getWorkWithId,
} from '../action';
import RenderPaymentDetails from './_components/render-payment-details';
import RenderPersonalDetails from './_components/render-personal-details';
import RenderServiceDetails from './_components/render-service-details';
import RenderVerificationDetails from './_components/render-verification-details';
import RenderWorkDetails from './_components/render-work-details';
import TopBar from './_components/top-bar';

interface VerifyUserPageParams {
  params: { verifyUserId: string };
}
export const revalidate = 0;

export default async function VerifyUserPage({ params }: VerifyUserPageParams) {
  const id = params.verifyUserId;

  const [details, services, work, verification, payment] = await Promise.all([
    getDetailsWithId(id),
    getServiceWithId(id),
    getWorkWithId(id),
    getVerificationWithId(id),
    getPaymentWithId(id),
  ]);

  return (
    <div className="bg-grey-200 relative pl-3">
      <div className="lg:px-12 my-2">
        <Crumb
          crumbData={[
            {
              text: 'User management',
              href: '/dashboard/admin/user-management',
            },
            {
              text: `${details.data?.fname} ${details.data?.lname}`,
              href: '',
            },
            {
              text: 'Verify user',
              href: '',
            },
          ]}
        />
      </div>
      <TopBar />
      <div className="lg:px-12 space-y-6">
        <RenderPersonalDetails details={details.data} />
        <RenderServiceDetails services={services.data} />
        <RenderWorkDetails work={work.data} />
        <RenderVerificationDetails verification={verification.data} />
        <RenderPaymentDetails payment={payment.data} />
      </div>
    </div>
  );
}
