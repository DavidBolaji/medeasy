import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';

import { AddressRepository } from '@/src/infrastructure/repositories/address.repository';
import { getAddressForUserController } from '@/src/adapters/address/get-address-for-user.controller';
import { getAddressForUserUseCase } from '@/src/application/use-cases/address/get-address-for-user-use-case';

export function createAddressModule() {
  const addressModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    // addressModule.bind(DI_SYMBOLS.IUserRepository).toClass(MockaddressRepository);
  } else {
    addressModule
      .bind(DI_SYMBOLS.IAddressRepository)
      .toClass(AddressRepository);
  }

  addressModule
    .bind(DI_SYMBOLS.IGetAddressForUserUseCase)
    .toHigherOrderFunction(getAddressForUserUseCase, [
      DI_SYMBOLS.IAddressRepository,
    ]);

  addressModule
    .bind(DI_SYMBOLS.IGetAddressForUserController)
    .toHigherOrderFunction(getAddressForUserController, [
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IGetAddressForUserUseCase,
    ]);

  return addressModule;
}
