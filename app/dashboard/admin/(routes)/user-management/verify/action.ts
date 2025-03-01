'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import {
  ServiceSchemaType,
  SignUpFiveSchemaType,
  SignUpFourSchemaType,
  SignUpTwoSchemaType,
  WorkSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getDetailsWithId(id: string): Promise<{
  success: boolean;
  error?: string;
  data?: SignUpTwoSchemaType;
}> {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getDetailsWithIdController = getInjection(
      'IGetDetailsWithIdController'
    );
    const response = await getDetailsWithIdController(id, sessionId);

    return {
      success: true,
      data: response,
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
}

export async function getServiceWithId(id: string): Promise<{
  success: boolean;
  error?: string;
  data?: any;
}> {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getServiceWithIdController = getInjection(
      'IGetServiceWithIdController'
    );
    const response = await getServiceWithIdController(id, sessionId);
    return {
      success: true,
      data: response as unknown as ServiceSchemaType,
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
}

export async function getWorkWithId(id: string): Promise<{
  success: boolean;
  error?: string;
  data?: WorkSchemaType;
}> {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getWorkWithIdController = getInjection('IGetWorkWithIdController');
    const response = await getWorkWithIdController(id, sessionId);
    return {
      success: true,
      data: response as unknown as WorkSchemaType,
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
}

export async function getVerificationWithId(id: string): Promise<{
  success: boolean;
  error?: string;
  data?: SignUpFourSchemaType;
}> {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getVerificationWithIdController = getInjection(
      'IGetVerificationWithIdController'
    );
    const response = await getVerificationWithIdController(id, sessionId);
    return {
      success: true,
      data: response as unknown as SignUpFourSchemaType,
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
}

export async function getPaymentWithId(id: string): Promise<{
  success: boolean;
  error?: string;
  data?: SignUpFiveSchemaType;
}> {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getPaymentsWithIdController = getInjection(
      'IGetPaymentsWithIdController'
    );
    const response = await getPaymentsWithIdController(id, sessionId);
    return {
      success: true,
      data: response as unknown as SignUpFiveSchemaType,
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
}
