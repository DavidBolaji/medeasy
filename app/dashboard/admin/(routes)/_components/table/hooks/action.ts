'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { AuthenticationError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import { cookies } from 'next/headers';

export const deleteRequest = async (data: Set<string>) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const deleteManyRequestController = getInjection(
      'IDeleteManyRequestController'
    );
    const response = await deleteManyRequestController(data, sessionId);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    if (
      error instanceof InputParseError ||
      error instanceof AuthenticationError
    ) {
      return {
        success: false,
        error: error.message,
      };
    }
    console.log((error as Error).message);
    return {
      success: false,
      error: 'Something went wrong',
    };
  }
};

export const deleteUsers = (data: Set<string>) => {};
