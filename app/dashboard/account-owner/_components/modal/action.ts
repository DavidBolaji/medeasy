'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { AccptedBiderSchemaType } from '@/src/entities/models/bid';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const updateBiderOffer = async (input: AccptedBiderSchemaType) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const acceptBiderOfferController = getInjection(
      'IAcceptBiderOfferController'
    );
    await acceptBiderOfferController(input, sessionId);
  } catch (error) {
    throw error;
  }
  if (input.stage === 'ONGOING') {
    return redirect('/dashboard/account-owner/home?active=ongoing');
  } else {
    // return redirect('/dashboard/account-owner/home?active=completed');
  }
};
