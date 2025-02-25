'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { ServiceSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getServiceDetails(sessionId: string | undefined) {
  try {
    const getServiceForUserController = getInjection(
      'IGetServiceForUserController'
    );
    return await getServiceForUserController(sessionId);
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

export const updatePersonalService = async (values: ServiceSchemaType) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updatePersonalServiceController = getInjection(
      'IUpdateServiceForUserController'
    );
    await updatePersonalServiceController(values, sessionId);
  } catch (error) {
    throw error;
  }

  redirect('/dashboard/help-provider/services-offered');
};
