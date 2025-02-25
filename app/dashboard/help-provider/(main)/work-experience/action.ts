'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { WorkSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getWorkDetails(sessionId: string | undefined) {
  try {
    const getWorkForUserController = getInjection('IGetWorkForUserController');
    return await getWorkForUserController(sessionId);
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

export const updatePersonalWork = async (values: WorkSchemaType) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updatePersonalWorkController = getInjection(
      'IUpdateWorkForUserController'
    );
    await updatePersonalWorkController(values, sessionId);
  } catch (error) {
    throw error;
  }

  redirect('/dashboard/help-provider/work-experience');
};
