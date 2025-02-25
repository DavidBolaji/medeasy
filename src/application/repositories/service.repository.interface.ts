import { CreateService, Service } from '@/src/entities/models/service';
import { ITransaction } from '@/src/entities/models/transaction';
import { Service as PService } from '@prisma/client';

export interface IServiceRepository {
  getUserServices(id: string): Promise<PService[] | []>;
  updateUserServices(services: Service[], userId: string): Promise<void>;

  createService(
    input: CreateService[],
    userId: string,
    tx?: ITransaction
  ): Promise<void>;
}
