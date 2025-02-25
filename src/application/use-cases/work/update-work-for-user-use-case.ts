import { WorkSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { ICertificationRepository } from '../../repositories/certification.repository.interface';
import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IUpdateWorkForUserUseCase = ReturnType<
  typeof updateWorkForUserUseCase
>;

export const updateWorkForUserUseCase =
  (
    usersRepository: IUsersRepository,
    certificateRepository: ICertificationRepository
  ) =>
  async (work: WorkSchemaType, userId: string) => {
    try {
      await Promise.all([
        usersRepository.updateWorkDetails(
          { cv: work.cv, medTrained: work.medical },
          userId
        ),
        certificateRepository.updateCertificate(work.certifications, userId),
      ]);
    } catch (error) {
      throw error;
    }
  };
