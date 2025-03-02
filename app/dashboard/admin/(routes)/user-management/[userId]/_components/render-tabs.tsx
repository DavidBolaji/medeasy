import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs';
import { profileList } from '@/app/_lib/data';
import React from 'react';
import RenderPersonalDetails from '../../verify/[verifyUserId]/_components/render-personal-details';
import {
  ServiceWithoutFormSchemaType,
  SignUpFiveSchemaType,
  SignUpFourSchemaType,
  SignUpTwoSchemaType,
  WorkSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import RenderWorkDetails from '../../verify/[verifyUserId]/_components/render-work-details';
import RenderServiceDetails from '../../verify/[verifyUserId]/_components/render-service-details';
import RenderVerificationDetails from '../../verify/[verifyUserId]/_components/render-verification-details';
import RenderPaymentDetails from '../../verify/[verifyUserId]/_components/render-payment-details';
import { ReturnReviewsWithIdType } from '@/src/entities/models/review';
import RenderReview from '@/app/dashboard/help-provider/_components/render-review';

interface RenderTabsProps {
  details: SignUpTwoSchemaType | undefined;
  work: WorkSchemaType | undefined;
  verification: SignUpFourSchemaType | undefined;
  services: ServiceWithoutFormSchemaType | undefined;
  payment: SignUpFiveSchemaType | undefined;
  reviews: ReturnReviewsWithIdType[] | undefined;
}

const RenderTabs: React.FC<RenderTabsProps> = ({
  details,
  work,
  verification,
  services,
  payment,
  reviews,
}) => {
  return (
    <Tabs color="white w-full" defaultValue="details" className="w-full ">
      <TabsList className="w-full rounded-none scrollbar-hide space-x-3 overflow-auto">
        {profileList.map((tab) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            className="border-b-2 border-[#E4E4EF] data-[state=active]:border-b-primary font-instrument font-medium"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="details" className="px-2 mt-4">
        <RenderPersonalDetails details={details} />
      </TabsContent>
      <TabsContent value="work" className="px-2 mt-4">
        <RenderServiceDetails services={services} />
        <div className="mb-4" />
        <RenderWorkDetails work={work} />
      </TabsContent>
      <TabsContent value="verification" className="px-2 mt-4">
        <RenderVerificationDetails verification={verification} />
      </TabsContent>
      <TabsContent value="payment" className="px-2 mt-4">
        <RenderPaymentDetails payment={payment} />
      </TabsContent>
      <TabsContent value="reviews" className="px-2 mt-4">
        {reviews?.map((review, ind) => (
          <div key={ind} className="">
            <RenderReview review={review} />
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default RenderTabs;
