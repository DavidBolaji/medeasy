import React from 'react';
import CreateRequestForm from './_components/create-request-form';
import Wrapper from '@/app/_components/wrapper/wrapper';
import DisplayRequestDetails from './_components/display-request-details';

export default async function DashboardAccountOwnerHomePage() {
  return (
    <div className="my-10">
      <Wrapper>
        <div className="grid grid-cols-12 md:mx-10 md:gap-x-10">
          <div className="md:col-span-6 col-span-12">
            <CreateRequestForm />
          </div>
          <div className="col-span-6 md:block hidden">
            <DisplayRequestDetails />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
