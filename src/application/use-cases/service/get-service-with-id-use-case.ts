import { Service } from '@prisma/client';
import { IServiceRepository } from '../../repositories/service.repository.interface';

export type IGetServiceWithIdUseCase = ReturnType<
  typeof getServiceWithIdUseCase
>;

export const getServiceWithIdUseCase =
  (serviceRepository: IServiceRepository) =>
  async (userId: string): Promise<Service[]> => {
    try {
      return (await serviceRepository.getUserServices(userId)) as Service[];
    } catch (error) {
      throw error;
    }
  };
