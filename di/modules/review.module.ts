import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { CertificationsRepository } from '@/src/infrastructure/repositories/certification.repository';
import { ReviewRepository } from '@/src/infrastructure/repositories/review.repository';
import { createReviewUseCase } from '@/src/application/use-cases/review/create-review-use-case';
import { createReviewController } from '@/src/adapters/review/create-review.controller';
import { getSingleReviewController } from '@/src/adapters/review/get-single-revew.controller';
import { getSingleReviewUseCase } from '@/src/application/use-cases/review/get-single-review-use-case';
import { updateReviewController } from '@/src/adapters/review/update-review.controller';
import { updateReviewUseCase } from '@/src/application/use-cases/review/update-review-use-case';

export function createReviewnModule() {
  const reviewModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // certificationModule.bind(DI_SYMBOLS.IUserRepository).toClass(MockcertificationRepository);
  } else {
    reviewModule.bind(DI_SYMBOLS.IReviewRepository).toClass(ReviewRepository);
  }

  //use case
  reviewModule
    .bind(DI_SYMBOLS.ICreateReviewUseCase)
    .toHigherOrderFunction(createReviewUseCase, [DI_SYMBOLS.IReviewRepository]);

  reviewModule
    .bind(DI_SYMBOLS.IGetSingleReviewUseCase)
    .toHigherOrderFunction(getSingleReviewUseCase, [
      DI_SYMBOLS.IReviewRepository,
    ]);

  reviewModule
    .bind(DI_SYMBOLS.IUpdateReviewUseCase)
    .toHigherOrderFunction(updateReviewUseCase, [DI_SYMBOLS.IReviewRepository]);

  //controller
  reviewModule
    .bind(DI_SYMBOLS.ICreateReviewController)
    .toHigherOrderFunction(createReviewController, [
      DI_SYMBOLS.ICreateReviewUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  reviewModule
    .bind(DI_SYMBOLS.IGetSingleReviewController)
    .toHigherOrderFunction(getSingleReviewController, [
      DI_SYMBOLS.IGetSingleReviewUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  reviewModule
    .bind(DI_SYMBOLS.IUpdateReviewController)
    .toHigherOrderFunction(updateReviewController, [
      DI_SYMBOLS.IUpdateReviewUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  return reviewModule;
}
