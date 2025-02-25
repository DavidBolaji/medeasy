import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetBidingOfferForRequestUseCase } from '@/src/application/use-cases/bid/get-biding-offer-for-request-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import {
  GetBidingOfferForRequestSchema,
  ReturnGetBidingOfferForRequestSchema,
} from '@/src/entities/models/bid';

export type IGetBidingOfferForRequestController = ReturnType<
  typeof getBidingOfferForRequestController
>;

function presenter(
  bider: GetBidingOfferForRequestSchema
): ReturnGetBidingOfferForRequestSchema {
  return {
    id: bider.id,
    counterPrice: bider.counterPrice,
    price: bider.price,
    request: bider.request,
  };
}

export const getBidingOfferForRequestController =
  (
    getBidingOfferForRequestUseCase: IGetBidingOfferForRequestUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (requestId: string, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get Bider');
      }

      const { session } =
        await authenticationService.validateSession(sessionId);

      const bider = await getBidingOfferForRequestUseCase(
        requestId,
        session.userId
      );
      return presenter(bider);
    } catch (error) {
      throw error;
    }
  };
