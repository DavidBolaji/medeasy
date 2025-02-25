import { Address } from '@prisma/client';
import { IAddressRepository } from '../../repositories/address.repository.interface';

export type IGetAddressForUserUseCase = ReturnType<
  typeof getAddressForUserUseCase
>;

export const getAddressForUserUseCase =
  (addressRepository: IAddressRepository) =>
  async (userId: string): Promise<Address> => {
    try {
      const address = await addressRepository.getUserAddress(userId);
      return address;
    } catch (error) {
      throw error;
    }
  };
