'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const updatePersonalDetails = async (values: SignUpTwoSchemaType) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updatePersonalDetailController = getInjection(
      'IUpdateDetailsForUserController'
    );
    await updatePersonalDetailController(values, sessionId);
  } catch (error) {
    throw error;
  }

  redirect('/dashboard/help-provider/personal-details');
};
