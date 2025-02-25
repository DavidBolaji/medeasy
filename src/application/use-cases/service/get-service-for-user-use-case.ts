import { Service } from '@prisma/client';
import { IServiceRepository } from '../../repositories/service.repository.interface';

export type IGetServiceForUserUseCase = ReturnType<
  typeof getServiceForUserUseCase
>;

export const getServiceForUserUseCase =
  (serviceRepository: IServiceRepository) =>
  async (userId: string): Promise<Service[]> => {
    try {
      return (await serviceRepository.getUserServices(userId)) as Service[];
    } catch (error) {
      throw error;
    }
  };
