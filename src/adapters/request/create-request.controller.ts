import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { ICreateRequestUseCase } from '@/src/application/use-cases/request/create-request-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  requestSchema,
  RequestSchemaType,
} from '@/src/entities/models/requests';

export type ICreateRequestController = ReturnType<
  typeof createRequestController
>;

export const createRequestController =
  (
    createRequestUseCase: ICreateRequestUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (input: RequestSchemaType, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update payments');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data: request, error: inputParseError } =
        requestSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await createRequestUseCase(request, session.userId);
    } catch (error) {
      throw error;
    }
  };
