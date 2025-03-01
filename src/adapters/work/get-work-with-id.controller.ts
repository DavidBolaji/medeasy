import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetWorkWithIdUseCase } from '@/src/application/use-cases/work/get-work-with-id-use-case';

import { UnauthenticatedError } from '@/src/entities/error/auth';
import { Certification } from '@/src/entities/models/certification';
import { IWorkDetail } from '@/src/entities/models/work';

function presenter(work: IWorkDetail, certificates: Certification[]) {
  return {
    cv: work.cv,
    medical: work.medTrained,
    certifications: certificates.map((certificate) => ({
      name: certificate.name,
      certificate: certificate.certificate,
    })),
  };
}

export type IGetWorkWithIdController = ReturnType<
  typeof getWorkWithIdController
>;

export const getWorkWithIdController =
  (
    getWorkWithIdUseCase: IGetWorkWithIdUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (id: string, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get work details');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { workDetails, certifications } = await getWorkWithIdUseCase(id);
      return presenter(workDetails, certifications);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
