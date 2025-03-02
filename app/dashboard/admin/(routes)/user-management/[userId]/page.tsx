import { Crumb } from '../../_components/crumb/crumb';
import {
  getDetailsWithId,
  getPaymentWithId,
  getReviewsWithId,
  getServiceWithId,
  getVerificationWithId,
  getWorkWithId,
} from '../verify/action';
import RenderTabs from './_components/render-tabs';
import TopBar from './_components/top-bar';

interface ManageUserPageParams {
  params: { userId: string };
}
export const revalidate = 0;

export default async function ViewUserPage({ params }: ManageUserPageParams) {
  const id = params.userId;

  const [details, services, work, verification, payment, reviews] =
    await Promise.all([
      getDetailsWithId(id),
      getServiceWithId(id),
      getWorkWithId(id),
      getVerificationWithId(id),
      getPaymentWithId(id),
      getReviewsWithId(id),
    ]);

  return (
    <div className="bg-grey-200">
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
          ]}
        />
      </div>
      <TopBar />
      <div className="lg:px-12">
        <RenderTabs
          details={details.data}
          services={services.data}
          verification={verification.data}
          work={work.data}
          payment={payment.data}
          reviews={reviews.data}
        />
      </div>
    </div>
  );
}
