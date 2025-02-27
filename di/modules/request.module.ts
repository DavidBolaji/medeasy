import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';
import { RequestRepository } from '@/src/infrastructure/repositories/request.repository';
import { createRequestController } from '@/src/adapters/request/create-request.controller';
import { createRequestUseCase } from '@/src/application/use-cases/request/create-request-use-case';
import { getAccountOwnerRequestsController } from '@/src/adapters/request/get-requests-account-owner.controller';
import { getAccountOwnerRequestsUseCase } from '@/src/application/use-cases/request/get-requests-account-owner-use-case';
import { getAllRequestsUseCase } from '@/src/application/use-cases/request/get-all-requests-use-case';
import { getAllRequestsController } from '@/src/adapters/request/get-all-requests.controller';
import { getSingleRequestUseCase } from '@/src/application/use-cases/request/get-single-request-use-case';
import { getSingleRequestsController } from '@/src/adapters/request/get-single-request.controller';
import { getRequestStatController } from '@/src/adapters/request/get-request-stat.controller';
import { getRequestStatusUseCase } from '@/src/application/use-cases/request/get-request-stat-use-case';
import { getMonthlyCompletedController } from '@/src/adapters/request/get-monthly-completed.controller';
import { getMonthlyCompletedusUseCase } from '@/src/application/use-cases/request/get-monthly-completed-use-case';

export function createRequestModule() {
  const requestModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // requestModule.bind(DI_SYMBOLS.IUserRepository).toClass(MockrequestRepository);
  } else {
    requestModule
      .bind(DI_SYMBOLS.IRequestRepository)
      .toClass(RequestRepository);
  }
  //use case
  requestModule
    .bind(DI_SYMBOLS.ICreateRequestUseCase)
    .toHigherOrderFunction(createRequestUseCase, [
      DI_SYMBOLS.IRequestRepository,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetAccountOwnerRequestsUseCase)
    .toHigherOrderFunction(getAccountOwnerRequestsUseCase, [
      DI_SYMBOLS.IRequestRepository,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetAllRequestsUseCase)
    .toHigherOrderFunction(getAllRequestsUseCase, [
      DI_SYMBOLS.IRequestRepository,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetSingleRequestUseCase)
    .toHigherOrderFunction(getSingleRequestUseCase, [
      DI_SYMBOLS.IRequestRepository,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetRequestStatUseCase)
    .toHigherOrderFunction(getRequestStatusUseCase, [
      DI_SYMBOLS.IRequestRepository,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetMonthlyCompletedUseCase)
    .toHigherOrderFunction(getMonthlyCompletedusUseCase, [
      DI_SYMBOLS.IRequestRepository,
    ]);

  // controller
  requestModule
    .bind(DI_SYMBOLS.ICreateRequestController)
    .toHigherOrderFunction(createRequestController, [
      DI_SYMBOLS.ICreateRequestUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetAccountOwnerRequestsController)
    .toHigherOrderFunction(getAccountOwnerRequestsController, [
      DI_SYMBOLS.IGetAccountOwnerRequestsUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetAllRequestsController)
    .toHigherOrderFunction(getAllRequestsController, [
      DI_SYMBOLS.IGetAllRequestsUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetSingleRequestController)
    .toHigherOrderFunction(getSingleRequestsController, [
      DI_SYMBOLS.IGetSingleRequestUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetRequestStatController)
    .toHigherOrderFunction(getRequestStatController, [
      DI_SYMBOLS.IGetRequestStatUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  requestModule
    .bind(DI_SYMBOLS.IGetMonthlyCompletedController)
    .toHigherOrderFunction(getMonthlyCompletedController, [
      DI_SYMBOLS.IGetMonthlyCompletedUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  return requestModule;
}
