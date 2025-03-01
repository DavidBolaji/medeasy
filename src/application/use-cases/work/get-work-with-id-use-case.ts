import { ICertificationRepository } from '../../repositories/certification.repository.interface';
import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IGetWorkWithIdUseCase = ReturnType<typeof getWorkWithIdUseCase>;

export const getWorkWithIdUseCase =
  (
    usersRepository: IUsersRepository,
    certificateRepository: ICertificationRepository
  ) =>
  async (userId: string) => {
    try {
      const workDetails = await usersRepository.getUserWorkDetails(userId);
      const certifications = await certificateRepository.getCertificate(userId);
      return { workDetails, certifications };
    } catch (error) {
      throw error;
    }
  };
