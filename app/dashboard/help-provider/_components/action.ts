'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { UpdateBidingOfferForRequestSchemaType } from '@/src/entities/models/bid';
import { cookies } from 'next/headers';

export const getBidingOfferForRequest = async (requestId: string) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const getBidingOfferForRequestController = getInjection(
      'IGetBidingOfferForRequestController'
    );
    return await getBidingOfferForRequestController(requestId, sessionId);
  } catch (error) {
    throw error;
  }
};

export const updateBidingOfferForRequest = async (
  input: UpdateBidingOfferForRequestSchemaType
) => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const updateBidingOfferForRequestController = getInjection(
      'IUpdateBidingOfferForRequestController'
    );
    return await updateBidingOfferForRequestController(input, sessionId);
  } catch (error) {
    throw error;
  }
};
