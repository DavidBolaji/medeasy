'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { RequestSchemaType } from '@/src/entities/models/requests';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createRequest(values: RequestSchemaType) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const createRequestController = getInjection('ICreateRequestController');
    await createRequestController(values, sessionId);
  } catch (error) {
    throw error;
  }
  redirect('/dashboard/account-owner/home');
}
