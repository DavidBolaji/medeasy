'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface ReturnDeleteUserAccount {
  success: boolean;
  error?: string;
}

export const deleteUserAccount = async (
  id: string
): Promise<ReturnDeleteUserAccount> => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const deleteUserAccountController = getInjection(
      'IDeleteUserAccountController'
    );
    await deleteUserAccountController(id, sessionId);
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
