'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { CounterBiderOfferSchemaType } from '@/src/entities/models/bid';
import { cookies } from 'next/headers';

export const counterBiderOffer = async (input: CounterBiderOfferSchemaType) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const counterBiderOfferController = getInjection(
      'ICounterBiderOfferController'
    );
    await counterBiderOfferController(input, sessionId);
  } catch (error) {
    throw error;
  }
};
