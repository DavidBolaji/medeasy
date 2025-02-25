import { IVerifyUser } from '@/src/entities/models/verification';
import { IVerificationService } from '../../services/verification.service.interface';

export type IVerificationUseCase = ReturnType<typeof verificationUseCase>;

export const verificationUseCase =
  (verificationService: IVerificationService) =>
  async <T extends IVerifyUser>(
    input: T,
    methodName: keyof IVerificationService
  ): Promise<boolean | string> => {
    try {
      const response = await verificationService[methodName]<T>(input);
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
