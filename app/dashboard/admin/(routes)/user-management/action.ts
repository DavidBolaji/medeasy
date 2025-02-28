'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { AuthenticationError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  GetAllUserParams,
  ReturnGetAllUsersType,
} from '@/src/entities/models/user';
import { cookies } from 'next/headers';

export async function getAllUsers(data: GetAllUserParams): Promise<{
  success: boolean;
  error?: string;
  data?: ReturnGetAllUsersType;
}> {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const getAllUserController = getInjection('IGetAllUserController');
    const response = await getAllUserController(data, sessionId);

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
}
