'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { AuthenticationError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import { ReturnGetRequestStatType } from '@/src/entities/models/requests';
import {
  ReturnGetUserAccountStatusType,
  ReturnGetUserRoleCountType,
} from '@/src/entities/models/user';
import { cookies } from 'next/headers';

interface GetUserRoleCount {
  success: boolean;
  error?: string;
  data?: ReturnGetUserRoleCountType[];
}

export const getUserRoleCount = async (): Promise<GetUserRoleCount> => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const getUserRoleCountController = getInjection(
      'IGetUserRoleCountController'
    );
    const response = await getUserRoleCountController(sessionId);
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

interface GetUserAccountStatus {
  success: boolean;
  error?: string;
  data?: ReturnGetUserAccountStatusType[];
}

export const getUserAccountStatus = async (): Promise<GetUserAccountStatus> => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const getUserAccountStatusController = getInjection(
      'IGetUserAccountStatusController'
    );
    const response = await getUserAccountStatusController(sessionId);
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

interface GetRequestStat {
  success: boolean;
  error?: string;
  data?: ReturnGetRequestStatType[];
}

export const getRequestStat = async (): Promise<GetRequestStat> => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const getRequestStatController = getInjection('IGetRequestStatController');
    const response = await getRequestStatController(sessionId);
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

interface GetMonthlyCompleted {
  success: boolean;
  error?: string;
  data?: { month: string; completed: number }[];
}

export const getMonthlyCompleted = async (): Promise<GetMonthlyCompleted> => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const getMonthlyCompletedController = getInjection(
      'IGetMonthlyCompletedController'
    );
    const response = await getMonthlyCompletedController(sessionId);
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
