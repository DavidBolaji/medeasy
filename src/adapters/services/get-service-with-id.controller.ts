import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetServiceWithIdUseCase } from '@/src/application/use-cases/service/get-service-with-id-use-case';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/src/entities/error/auth';
import { Service } from '@/src/entities/models/service';

import { Service as PService } from '@prisma/client';

function presenter(services: PService[]) {
  return services.map((service) => {
    return {
      id: service.id,
      name: service.name,
      experience: service.experience,
      duration: service.duration.toString(),
    };
  });
}

export type IGetServiceWithIdController = ReturnType<
  typeof getServiceWithIdController
>;
export const getServiceWithIdController =
  (
    authenticationService: IAuthenticationService,
    getServiceWithIdUseCase: IGetServiceWithIdUseCase
  ) =>
  async (id: string, sessionId: string | undefined): Promise<Service[]> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get services');
      }
      const { userType } =
        await authenticationService.validateSession(sessionId);

      if (userType !== 'Admin') {
        throw new UnauthorizedError('User must be admin');
      }

      const services = await getServiceWithIdUseCase(id);
      return presenter(services);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
