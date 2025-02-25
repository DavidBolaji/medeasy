import { db } from '@/prisma';
import { ICertificationRepository } from '@/src/application/repositories/certification.repository.interface';
import { Certification } from '@/src/entities/models/certification';
import { ITransaction } from '@/src/entities/models/transaction';
import { Certification as PCertification } from '@prisma/client';

export class CertificationsRepository implements ICertificationRepository {
  constructor() {}

  async getCertificate(userId: string): Promise<PCertification[]> {
    try {
      const certificates = await db.certification.findMany({
        where: { userId },
      });
      return certificates;
    } catch (error) {
      throw error;
    }
  }

  async updateCertificate(
    certificate: Certification[],
    userId: string
  ): Promise<void> {
    try {
      await db.certification.deleteMany({ where: { userId } });
      await this.createCertification(certificate, userId);
    } catch (error) {
      throw error;
    }
  }

  async createCertification(
    input: Certification[],
    userId: string,
    tx?: ITransaction
  ): Promise<void> {
    const invoker = tx ?? db;
    try {
      await invoker.certification.createMany({
        data: [
          ...input.map((cert) => ({
            certificate: cert.certificate as string,
            name: cert.name as string,
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
