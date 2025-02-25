import { ICertificationRepository } from '../../repositories/certification.repository.interface';
import { IUsersRepository } from '../../repositories/user.repository.interface';

export type IGetWorkForUserUseCase = ReturnType<typeof getWorkForUserUseCase>;

export const getWorkForUserUseCase =
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
