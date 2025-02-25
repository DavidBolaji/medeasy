import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';

import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import DashboardNotification from '../_components/notification/dashboard-notification';
import Loading from '../_components/navigating';

export async function getUserRole(sessionId: string | undefined) {
  try {
    const getUserRoleController = getInjection('IGetUserRoleController');
    return await getUserRoleController(sessionId);
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

export async function getPersonalDetails(sessionId: string | undefined) {
  try {
    const getDetailsForUserController = getInjection(
      'IGetDetailsForUserController'
    );
    return await getDetailsForUserController(sessionId);
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

export default async function RootDashboardLayout({
  children,
}: PropsWithChildren) {
  return (
    <div>
      {children}
      <Loading />
      <DashboardNotification />
    </div>
  );
}
