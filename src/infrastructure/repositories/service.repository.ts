import { db } from '@/prisma';
import { IServiceRepository } from '@/src/application/repositories/service.repository.interface';
import { CreateService, Service } from '@/src/entities/models/service';
import { ITransaction } from '@/src/entities/models/transaction';
import { Service as PService } from '@prisma/client';

export class ServiceRepository implements IServiceRepository {
  constructor() {}

  async getUserServices(id: string): Promise<PService[] | []> {
    try {
      const services = await db.service.findMany({
        where: {
          userId: id,
        },
      });

      return services;
    } catch (error) {
      throw error;
    }
  }

  async updateUserServices(services: Service[], userId: string): Promise<void> {
    try {
      await db.service.deleteMany({ where: { userId } });
      await this.createService(services, userId);
    } catch (error) {
      throw error;
    }
  }

  async createService(
    input: CreateService[],
    userId: string,
    tx?: ITransaction
  ): Promise<void> {
    const invoker = tx ?? db;
    try {
      await invoker.service.createMany({
        data: [
          ...input.map((service) => ({
            experience: service.experience as string,
            name: service.name as string,
            duration: +service.duration as number,
            userId,
          })),
        ],
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}
