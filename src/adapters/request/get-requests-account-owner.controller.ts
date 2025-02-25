import { parseIntToCurrency } from '@/app/_lib/utils';
import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetAccountOwnerRequestsUseCase } from '@/src/application/use-cases/request/get-requests-account-owner-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import {
  GetAccountOwnerRequestType,
  GetRequestsSchemaType,
  ReturnRequestSchemaType,
} from '@/src/entities/models/requests';
import { format } from 'timeago.js';

export type IGetAccountOwnerRequestsController = ReturnType<
  typeof getAccountOwnerRequestsController
>;

function presenter(
  requests: GetAccountOwnerRequestType[]
): ReturnRequestSchemaType[] {
  const requestList: ReturnRequestSchemaType[] = [];

  requests.forEach((request) => {
    requestList.push({
      id: request.id,
      service: request.service,
      title: request.title,
      description: request.description,
      stage: request.stage,
      duration: request.duration,
      start: request.start.toISOString(),
      location: request.location,
      price: parseIntToCurrency(request.price.toString()),
      negotiable: request.negotiable,
      createdAt: format(request.createdAt.toISOString()),
      finalPrice: request.finalPrice,
      acceptedBiderId: request.acceptedBiderId,
      biders: request._count.biders,
      acceptedBider: request.acceptedBider ? request.acceptedBider : null,
    });
  });

  return requestList as ReturnRequestSchemaType[];
}

export const getAccountOwnerRequestsController =
  (
    getAccountOwnerRequestsUseCase: IGetAccountOwnerRequestsUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (input: GetRequestsSchemaType, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get requests');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { requests, total } = await getAccountOwnerRequestsUseCase(
        input,
        session.userId
      );

      return {
        requests: presenter(requests as GetAccountOwnerRequestType[]),
        total,
      };
    } catch (error) {
      throw error;
    }
  };
