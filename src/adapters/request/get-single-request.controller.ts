import { parseIntToCurrency } from '@/app/_lib/utils';
import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetSingleRequestUseCase } from '@/src/application/use-cases/request/get-single-request-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import {
  GetSingleRequestType,
  ReturnSingleRequestSchemaType,
} from '@/src/entities/models/requests';
import { format } from 'timeago.js';

export type IGetSingleRequestController = ReturnType<
  typeof getSingleRequestsController
>;

function presenter(
  request: GetSingleRequestType | null
): ReturnSingleRequestSchemaType | null {
  if (!request) {
    return null;
  }
  return {
    id: request.id,
    service: request.service,
    title: request.title,
    description: request.description,
    duration: request.duration,
    start: request.start.toISOString(),
    location: request.location,
    price: parseIntToCurrency(request.price.toString()),
    finalPrice: parseIntToCurrency(request.finalPrice.toString()),
    negotiable: request.negotiable,
    createdAt: format(request.createdAt.toISOString()),
    user: {
      id: request?.user?.id || '',
      fname: request?.user?.fname || '',
      lname: request?.user?.lname || '',
      email: request?.user?.email || '',
    },
  };
}

export const getSingleRequestsController =
  (
    getSingleRequestUseCase: IGetSingleRequestUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    requestId: string,
    sessionId: string | undefined
  ): Promise<ReturnType<typeof presenter>> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get requests');
      }

      await authenticationService.validateSession(sessionId);

      const { request } = await getSingleRequestUseCase(requestId);

      return presenter(request);
    } catch (error) {
      throw error;
    }
  };
