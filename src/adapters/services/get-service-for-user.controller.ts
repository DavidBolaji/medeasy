import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetServiceForUserUseCase } from '@/src/application/use-cases/service/get-service-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
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

export type IGetServiceForUserController = ReturnType<
  typeof getServiceForUserController
>;
export const getServiceForUserController =
  (
    authenticationService: IAuthenticationService,
    getServiceForUserUseCase: IGetServiceForUserUseCase
  ) =>
  async (sessionId: string | undefined): Promise<Service[]> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get services');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const services = await getServiceForUserUseCase(session.userId);
      return presenter(services);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
