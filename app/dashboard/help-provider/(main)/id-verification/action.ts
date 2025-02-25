'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { SignUpFourSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { IVerifyUser } from '@/src/entities/models/verification';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const updateVerificationDetails = async (
  values: SignUpFourSchemaType
) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updateVerificationForUserController = getInjection(
      'IUpdateVerificationForUserController'
    );
    await updateVerificationForUserController(values, sessionId);
  } catch (error) {
    throw error;
  }

  redirect('/dashboard/help-provider/id-verification');
};

export const updateIDVerificationDetails = async (
  values: Omit<IVerifyUser, 'user'>
): Promise<boolean> => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updateIDVerificationForUserController = getInjection(
      'IUpdateIDVerificationForUserController'
    );
    await updateIDVerificationForUserController(values, sessionId);
  } catch (error) {
    throw error;
  }

  redirect('/dashboard/help-provider/id-verification');
};
