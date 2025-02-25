import type {
  GetRequestsSchemaType,
  RequestStatus,
} from '@/src/entities/models/requests';

import RenderRequestList from './render-request-list';
import { getInjection } from '@/di/container';
import { SESSION_COOKIE } from '@/config';
import { cookies } from 'next/headers';
import { unstable_noStore } from 'next/cache';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { redirect } from 'next/navigation';

export async function getAccountOwnerRequests(input: GetRequestsSchemaType) {
  unstable_noStore(); // Opt out of static rendering
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getAccountOwnerRequestsController = getInjection(
      'IGetAccountOwnerRequestsController'
    );
    return await getAccountOwnerRequestsController(input, sessionId);
  } catch (error) {
    if (
      error instanceof UnauthenticatedError ||
      error instanceof AuthenticationError
    ) {
      redirect('/start/account-owner/sign-in');
    }
    throw error;
  }
}

export default async function RequestList({
  stage,
  page,
  limit,
}: {
  stage: RequestStatus;
  page: string;
  limit: string;
}) {
  const { requests, total } = await getAccountOwnerRequests({
    stage,
    page,
    limit,
  });

  return <RenderRequestList requests={requests} />;
}
