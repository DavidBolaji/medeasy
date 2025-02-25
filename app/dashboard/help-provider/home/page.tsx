import Wrapper from '@/app/_components/wrapper/wrapper';
import {
  RequestStatus,
  ReturnAllRequestSchemaType,
} from '@/src/entities/models/requests';
import React, { Suspense } from 'react';
import { RequestTabs } from '../../account-owner/_components/request-tabs';
import AllRequestList from '../_components/all-request-list';
import ProfileCard from '@/app/_components/card/profile-card';
import { getPersonalDetails } from '../../layout';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';

import RequestHelpProviderModal from '../_components/modal/request-help-provider-modal';
import RequestHelpProviderDrawer from '../_components/modal/request-help-provider-drawer';
import { getWorkDetails } from '../(main)/work-experience/action';
import { getServiceDetails } from '../(main)/services-offered/action';
import { getAllRequests } from './action';

interface HomeSearchParams {
  [key: string]: string;
}

export const revalidate = 0;

export default async function DashboardHelpProviderHomePage({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  const stage = ((await searchParams)?.active || 'new') as RequestStatus;
  const page = (await searchParams)?.page || '1';
  const limit = (await searchParams)?.limit || '10';

  const [personalDetails, work, services] = await Promise.all([
    getPersonalDetails(sessionId),
    getWorkDetails(sessionId),
    getServiceDetails(sessionId),
  ]);

  let allRequest: ReturnAllRequestSchemaType[];
  let requestCount: number;

  try {
    const { requests, total } = await getAllRequests({
      stage,
      page,
      limit,
    });
    allRequest = requests;
    requestCount = total;
  } catch (error) {
    throw error;
  }

  return (
    <div className="pb-20">
      <Wrapper>
        <RequestTabs activeTab={stage} />
        <div className="grid gap-8 grid-cols-12">
          <div className="md:col-span-7 col-span-12">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
              }
            >
              <AllRequestList requests={allRequest} />
            </Suspense>
          </div>
          <div className="md:col-span-5 col-span-12 md:block hidden">
            <ProfileCard
              personalDetails={personalDetails}
              work={work}
              services={services}
            />
          </div>
        </div>
      </Wrapper>
      <RequestHelpProviderModal requests={allRequest} />
      <RequestHelpProviderDrawer requests={allRequest} />
    </div>
  );
}
