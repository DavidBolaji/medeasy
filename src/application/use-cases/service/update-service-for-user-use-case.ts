import { Service } from '@/src/entities/models/service';
import { IServiceRepository } from '../../repositories/service.repository.interface';

export type IUpdateServiceForUserUseCase = ReturnType<
  typeof updateServiceForUserUseCase
>;

export const updateServiceForUserUseCase =
  (serviceRepository: IServiceRepository) =>
  async (services: Service[], userId: string): Promise<void> => {
    try {
      return await serviceRepository.updateUserServices(services, userId);
    } catch (error) {
      throw error;
    }
  };
