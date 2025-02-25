import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetBidersForRequestUseCase } from '@/src/application/use-cases/bid/get-biders-for-request-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { RequestBiderSchemaType } from '@/src/entities/models/bid';
import { format } from 'timeago.js';

export type IGetBidersForRequestController = ReturnType<
  typeof getBidersForRequestController
>;

function presenter(biders: RequestBiderSchemaType[]): RequestBiderSchemaType[] {
  const requestList: RequestBiderSchemaType[] = [];

  biders.forEach((bider) => {
    requestList.push({
      id: bider.id,
      pitch: bider.pitch,
      price: bider.price,
      createdAt: format((bider.createdAt as Date).toISOString()),
      request: {
        service: bider.request.service,
      },
      user: {
        id: bider.user.id,
        fname: bider.user.fname,
        lname: bider.user.lname,
        gender: bider.user.gender,
        language: bider.user.language,
        cv: bider.user.cv,
        receivedReview: bider.user.receivedReview,
        services: bider.user.services,
        certificates: bider.user.certificates,
      },
    });
  });

  return requestList;
}

export const getBidersForRequestController =
  (
    getBidersForRequestUseCase: IGetBidersForRequestUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (requestId: string, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get Biders');
      }

      await authenticationService.validateSession(sessionId);

      const biders = await getBidersForRequestUseCase(requestId);
      return presenter(biders);
    } catch (error) {
      throw error;
    }
  };
