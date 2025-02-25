import React, { Suspense } from 'react';
import { RequestTabs } from '../_components/request-tabs';
import { RequestStatus } from '@/src/entities/models/requests';
import Wrapper from '@/app/_components/wrapper/wrapper';
import RequestList from '../_components/request-list';

interface HomeSearchParams {
  [key: string]: string;
}

export const revalidate = 0;

export default async function DashboardAccountOwnerHomePage({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
  const stage = ((await searchParams)?.active || 'new') as RequestStatus;
  const page = (await searchParams)?.page || '1';
  const limit = (await searchParams)?.limit || '10';

  return (
    <div className="pb-20">
      <Wrapper>
        <RequestTabs activeTab={stage} />
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <RequestList stage={stage} page={page} limit={limit} />
        </Suspense>
      </Wrapper>
    </div>
  );
}
