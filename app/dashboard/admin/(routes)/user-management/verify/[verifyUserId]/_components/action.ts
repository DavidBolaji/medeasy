'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { UpdateUserVerification } from '@/src/entities/models/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface ReturnUpdateUserVerification {
  success: boolean;
  error?: string;
}

export const updateUserVerification = async (
  input: UpdateUserVerification
): Promise<ReturnUpdateUserVerification> => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updateUserVerificationController = getInjection(
      'IUpdateUserVerificationController'
    );
    await updateUserVerificationController(input, sessionId);

    return {
      success: true,
    };
  } catch (error) {
    if (
      error instanceof UnauthenticatedError ||
      error instanceof AuthenticationError
    ) {
      redirect('/dashboard/admin');
    }
    return {
      success: false,
      error: 'Something went wrong',
    };
  }
};
