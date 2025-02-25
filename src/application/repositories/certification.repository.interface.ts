import {
  Certification,
  CreateCertification,
} from '@/src/entities/models/certification';
import { ITransaction } from '@/src/entities/models/transaction';
import { Certification as PCertification } from '@prisma/client';

export interface ICertificationRepository {
  getCertificate(userId: string): Promise<PCertification[]>;
  updateCertificate(
    certificate: Certification[],
    userId: string
  ): Promise<void>;
  createCertification(
    input: CreateCertification[],
    userId: string,
    tx?: ITransaction
  ): Promise<void>;
}
