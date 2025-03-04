import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetAllRequestUseCase } from '@/src/application/use-cases/request/get-all-request-use-case';

import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import {
  GetAllRequestParams,
  IGetAllRequestType,
  IRequest,
  ReturnIGetAllRequestType,
} from '@/src/entities/models/requests';
import { format } from 'date-fns';

export type IGetAllRequestController = ReturnType<
  typeof getAllRequestController
>;

function presenter(input: IGetAllRequestType): ReturnIGetAllRequestType {
  const AllRequests: IRequest[] = [];

  input.requests.forEach((req) => {
    AllRequests.push({
      id: req.id,
      title: `Help Needed: ${req.title}`,
      location: req.location,
      createdAt: format(req.createdAt, 'PPP'),
      stage: req.stage,
      user: {
        fname: req.user?.fname || '',
        lname: req.user?.lname || '',
      },
      acceptedBider: {
        user: {
          fname: req.acceptedBider?.user.fname || '',
          lname: req.acceptedBider?.user?.lname || '',
        },
      },
    });
  });
  return { requests: AllRequests, totalPages: input.totalPages };
}

export const getAllRequestController =
  (
    authenticationService: IAuthenticationService,
    getAllRequestUseCase: IGetAllRequestUseCase
  ) =>
  async (
    input: GetAllRequestParams,
    sessionId: string | undefined
  ): Promise<ReturnType<typeof presenter>> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get details');
      }
      const { userType } =
        await authenticationService.validateSession(sessionId);

      if (userType !== 'Admin') {
        throw new UnauthorizedError('User must be admin');
      }

      const result = await getAllRequestUseCase(input);
      return presenter(result);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
