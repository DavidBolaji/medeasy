'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import { BidSchemaType } from '@/src/entities/models/bid';
import { GetRequestsSchemaType } from '@/src/entities/models/requests';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createDashboardNotification(
  userId: string | undefined,
  message: string,
  title: string
) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const createNotificationController = getInjection(
      'ICreateNotificationController'
    );
    await createNotificationController(userId, message, title, sessionId);
  } catch (err) {
    if (err instanceof InputParseError) {
      throw err;
    }
    if (err instanceof UnauthenticatedError) {
      redirect(`/start/help-provider/sign-in`);
    }
    throw err;
  }
}

export async function sendPushNotification(
  userId: string | undefined,
  message: string,
  name: string
) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const sendPushController = getInjection('ISendPushController');
    await sendPushController(userId, message, name, sessionId);
  } catch (err) {
    if (err instanceof InputParseError) {
      throw err;
    }
    if (err instanceof UnauthenticatedError) {
      redirect(`/start/help-provider/sign-in`);
    }
    throw err;
  }
}

export async function createBid(values: BidSchemaType, requestId: string) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const createBidController = getInjection('ICreateBidController');
    await createBidController(values, sessionId, requestId);
  } catch (err) {
    if (err instanceof InputParseError) {
      throw err;
    }
    if (err instanceof UnauthenticatedError) {
      redirect(`/start/help-provider/sign-in`);
    }
    throw err;
  }
  redirect(`/dashboard/help-provider/home?active=new`);
}

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

export async function getAllRequests(input: GetRequestsSchemaType) {
  unstable_noStore(); // Opt out of static rendering
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getAllRequestsController = getInjection('IGetAllRequestsController');
    return await getAllRequestsController(input, sessionId);
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
