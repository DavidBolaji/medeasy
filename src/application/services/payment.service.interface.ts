import { IBanks } from '@/src/entities/models/payment';

export interface IPaymentService {
  getBanks(): Promise<IBanks[]>;
}
