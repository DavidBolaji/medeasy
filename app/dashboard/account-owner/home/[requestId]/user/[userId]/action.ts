'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  CreateReviwSchemaType,
  UpdateReviwSchemaType,
} from '@/src/entities/models/review';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSingleRequest(id: string) {
  unstable_noStore(); // Opt out of static rendering
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getSingleRequestController = getInjection(
      'IGetSingleRequestController'
    );
    return await getSingleRequestController(id, sessionId);
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

export async function getSingleReview(id: string, requestId: string) {
  unstable_noStore(); // Opt out of static rendering
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getSingleReviewController = getInjection(
      'IGetSingleReviewController'
    );
    return await getSingleReviewController(id, requestId, sessionId);
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

export async function createReview(values: CreateReviwSchemaType) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const createReviewController = getInjection('ICreateReviewController');
    await createReviewController(values, sessionId);
  } catch (err) {
    if (err instanceof InputParseError) {
      throw err;
    }
    if (err instanceof UnauthenticatedError) {
      redirect(`/start/account-owner/sign-in`);
    }
    throw err;
  }
  redirect(
    `/dashboard/account-owner/home/${values.requestId}/user/${values.receivedId}`
  );
}

export async function updateReview(values: UpdateReviwSchemaType) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const updateReviewController = getInjection('IUpdateReviewController');
    await updateReviewController(values, sessionId);
  } catch (err) {
    if (err instanceof InputParseError) {
      throw err;
    }
    if (err instanceof UnauthenticatedError) {
      redirect(`/start/account-owner/sign-in`);
    }
    throw err;
  }
  redirect(
    `/dashboard/account-owner/home/${values.requestId}/user/${values.receivedId}`
  );
}
