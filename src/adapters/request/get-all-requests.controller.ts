import { parseIntToCurrency } from '@/app/_lib/utils';
import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetAllRequestsUseCase } from '@/src/application/use-cases/request/get-all-requests-use-case';

import { UnauthenticatedError } from '@/src/entities/error/auth';
import {
  GetAllRequestType,
  GetRequestsSchemaType,
  ReturnAllRequestSchemaType,
} from '@/src/entities/models/requests';
import { GENDER } from '@prisma/client';
import { format } from 'timeago.js';

export type IGetAllRequestsController = ReturnType<
  typeof getAllRequestsController
>;

function presenter(
  requests: GetAllRequestType[]
): ReturnAllRequestSchemaType[] {
  const requestList: ReturnAllRequestSchemaType[] = [];

  requests.forEach((request) => {
    requestList.push({
      id: request.id,
      service: request.service,
      title: request.title,
      description: request.description,
      duration: request.duration,
      start: request.start.toISOString(),
      location: request.location,
      price: parseIntToCurrency(request.price.toString()),
      negotiable: request.negotiable,
      createdAt: format(request.createdAt.toISOString()),
      finalPrice: parseIntToCurrency(request.finalPrice.toString()),
      user: {
        id: request.userId,
        fname: request?.user?.fname || '',
        lname: request?.user?.lname || '',
        language: request.user?.language || '',
        gender: request.user?.gender as GENDER,
        completedRequests: request.user?._count.requests || 0,
        reviews: request.user?.receivedReview || [],
      },
      acceptedBider: request.acceptedBider,
    });
  });

  return requestList;
}

export const getAllRequestsController =
  (
    getAllRequestsUseCase: IGetAllRequestsUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (input: GetRequestsSchemaType, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get requests');
      }

      const { session } =
        await authenticationService.validateSession(sessionId);

      const { requests, total } = await getAllRequestsUseCase(
        input,
        session.userId
      );

      return { requests: presenter(requests), total };
    } catch (error) {
      throw error;
    }
  };
