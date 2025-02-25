import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { CertificationsRepository } from '@/src/infrastructure/repositories/certification.repository';

export function createCertificationModule() {
  const certificationModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // certificationModule.bind(DI_SYMBOLS.IUserRepository).toClass(MockcertificationRepository);
  } else {
    certificationModule
      .bind(DI_SYMBOLS.ICertificationRepository)
      .toClass(CertificationsRepository);
  }

  return certificationModule;
}
