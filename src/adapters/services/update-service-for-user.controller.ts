import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IUpdateServiceForUserUseCase } from '@/src/application/use-cases/service/update-service-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  serviceSchema,
  ServiceSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';

export type IUpdateServiceForUserController = ReturnType<
  typeof updateServiceForUserController
>;
export const updateServiceForUserController =
  (
    updateServiceForUserUseCase: IUpdateServiceForUserUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (services: ServiceSchemaType, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update services');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data, error: inputParseError } =
        serviceSchema.safeParse(services);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await updateServiceForUserUseCase(data.services, session.userId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
