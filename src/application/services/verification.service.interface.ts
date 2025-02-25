import { IVerifyUser } from '@/src/entities/models/verification';

export interface IVerificationService {
  validateUser<T extends IVerifyUser>(input: T): Promise<boolean>;
  validateUserAccount<T extends IVerifyUser>(input: T): Promise<string>;
}
