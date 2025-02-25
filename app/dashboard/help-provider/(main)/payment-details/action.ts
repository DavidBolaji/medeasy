'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { SignUpFiveSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { IVerifyUser } from '@/src/entities/models/verification';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const updatePaymentDetails = async (values: SignUpFiveSchemaType) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updatePaymentForUserController = getInjection(
      'IUpdatePaymentForUserController'
    );
    await updatePaymentForUserController(values, sessionId);
  } catch (error) {
    throw error;
  }

  redirect('/dashboard/help-provider/payment-details');
};

export const updateValidatePaymentDetails = async (
  values: Pick<IVerifyUser, 'actNo' | 'bank'>
): Promise<string> => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updatePaymentValidationForUserController = getInjection(
      'IUpdatePaymentValidationForUserController'
    );
    return await updatePaymentValidationForUserController(values, sessionId);
  } catch (error) {
    throw error;
  }
};
