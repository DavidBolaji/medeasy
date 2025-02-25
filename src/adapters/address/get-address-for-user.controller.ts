import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IGetAddressForUserUseCase } from '@/src/application/use-cases/address/get-address-for-user-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { SignUpAddressSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { Address } from '@prisma/client';

function presenter(address: Address): SignUpAddressSchemaType {
  return {
    country: address.country,
    state: address.state,
    street: address.street,
    other: address?.other || undefined,
    address: address.address,
  };
}

export type IGetAddressForUserController = ReturnType<
  typeof getAddressForUserController
>;
export const getAddressForUserController =
  (
    authenticationService: IAuthenticationService,
    getAddressForUserUseCase: IGetAddressForUserUseCase
  ) =>
  async (
    sessionId: string | undefined
  ): Promise<ReturnType<typeof presenter>> => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get services');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const address = await getAddressForUserUseCase(session.userId);
      return presenter(address);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
