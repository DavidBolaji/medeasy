import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';

import { createBidController } from '@/src/adapters/bid/create-bid-controller';
import { createBidUseCase } from '@/src/application/use-cases/bid/create-bid-use-case';
import { BidRepository } from '../../src/infrastructure/repositories/bid.repository';
import { getBidersForRequestUseCase } from '@/src/application/use-cases/bid/get-biders-for-request-use-case';
import { getBidersForRequestController } from '@/src/adapters/bid/get-biders-for-request.controller';
import { acceptBiderOfferController } from '@/src/adapters/bid/accept-bid.controller';
import { acceptBiderOfferUseCase } from '@/src/application/use-cases/bid/accept-bid-use-case';
import { counterBiderOfferUseCase } from '@/src/application/use-cases/bid/counter-bider-offer-use-case';
import { counterBiderOfferController } from '@/src/adapters/bid/counter-bider-offer.controller';
import { getBidingOfferForRequestUseCase } from '@/src/application/use-cases/bid/get-biding-offer-for-request-use-case';
import { getBidingOfferForRequestController } from '@/src/adapters/bid/get-biding-offer-for-request.controller';
import { updateBidingOfferForRequestUseCase } from '@/src/application/use-cases/bid/update-biding-offer-for-request-use-case';
import { updateBidingOfferForRequestController } from '@/src/adapters/bid/update-biding-offer-for-request.controller';

export function createBidModule() {
  const bidModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // addressModule.bind(DI_SYMBOLS.IUserRepository).toClass(MockaddressRepository);
  } else {
    bidModule.bind(DI_SYMBOLS.IBidRepository).toClass(BidRepository);
  }

  bidModule
    .bind(DI_SYMBOLS.ICreateBidUseCase)
    .toHigherOrderFunction(createBidUseCase, [DI_SYMBOLS.IBidRepository]);

  bidModule
    .bind(DI_SYMBOLS.IGetBidersForRequestUseCase)
    .toHigherOrderFunction(getBidersForRequestUseCase, [
      DI_SYMBOLS.IBidRepository,
    ]);

  bidModule
    .bind(DI_SYMBOLS.IAcceptBiderOfferUseCase)
    .toHigherOrderFunction(acceptBiderOfferUseCase, [
      DI_SYMBOLS.IRequestRepository,
    ]);

  bidModule
    .bind(DI_SYMBOLS.ICounterBiderOfferUseCase)
    .toHigherOrderFunction(counterBiderOfferUseCase, [
      DI_SYMBOLS.IBidRepository,
    ]);

  bidModule
    .bind(DI_SYMBOLS.IGetBidingOfferForRequestUseCase)
    .toHigherOrderFunction(getBidingOfferForRequestUseCase, [
      DI_SYMBOLS.IBidRepository,
    ]);

  bidModule
    .bind(DI_SYMBOLS.IUpdateBidingOfferForRequestUseCase)
    .toHigherOrderFunction(updateBidingOfferForRequestUseCase, [
      DI_SYMBOLS.IBidRepository,
    ]);

  // controller
  bidModule
    .bind(DI_SYMBOLS.ICreateBidController)
    .toHigherOrderFunction(createBidController, [
      DI_SYMBOLS.ICreateBidUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  bidModule
    .bind(DI_SYMBOLS.IGetBidersForRequestController)
    .toHigherOrderFunction(getBidersForRequestController, [
      DI_SYMBOLS.IGetBidersForRequestUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  bidModule
    .bind(DI_SYMBOLS.IAcceptBiderOfferController)
    .toHigherOrderFunction(acceptBiderOfferController, [
      DI_SYMBOLS.IAcceptBiderOfferUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  bidModule
    .bind(DI_SYMBOLS.ICounterBiderOfferController)
    .toHigherOrderFunction(counterBiderOfferController, [
      DI_SYMBOLS.ICounterBiderOfferUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  bidModule
    .bind(DI_SYMBOLS.IGetBidingOfferForRequestController)
    .toHigherOrderFunction(getBidingOfferForRequestController, [
      DI_SYMBOLS.IGetBidingOfferForRequestUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  bidModule
    .bind(DI_SYMBOLS.IUpdateBidingOfferForRequestController)
    .toHigherOrderFunction(updateBidingOfferForRequestController, [
      DI_SYMBOLS.IUpdateBidingOfferForRequestUseCase,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  return bidModule;
}
