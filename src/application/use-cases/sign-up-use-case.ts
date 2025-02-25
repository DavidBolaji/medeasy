import { AuthenticationError } from '@/src/entities/error/auth';
import {
  allSignUppAccountOwnerSchemaType,
  allSignUpSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import { Cookie } from '@/src/entities/models/cookie';

import { IUsersRepository } from '../repositories/user.repository.interface';
import { IAuthenticationService } from '../services/auth.service.interface';
import { ICertificationRepository } from '../repositories/certification.repository.interface';
import { Session } from '@/src/entities/models/session';
import { IPaymentRepository } from '../repositories/payment.repository.interface';
import { IVerificationRepository } from '../repositories/verification.repository.interface';
import { IServiceRepository } from '../repositories/service.repository.interface';
import { IAddressRepository } from '../repositories/address.repository.interface';
import { ITransaction } from '@/src/entities/models/transaction';

export type ISignUpUseCase = ReturnType<typeof signUpUseCase>;

export const signUpUseCase =
  (
    usersRepository: IUsersRepository,
    certificationRepository: ICertificationRepository,
    paymentRepository: IPaymentRepository,
    verificationRepository: IVerificationRepository,
    serviceRepository: IServiceRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: allSignUpSchemaType,
    tx?: ITransaction
  ): Promise<{
    session: Session;
    cookie: Cookie;
  }> => {
    const existingUser = await usersRepository.getUserByEmail(input.email);

    if (existingUser) {
      throw new AuthenticationError('Email taken');
    }

    const hashed_password = await authenticationService.generateHash(
      input.password
    );

    try {
      const newUser = await usersRepository.createUser(
        {
          fname: input.fname,
          lname: input.lname,
          email: input.email,
          gender: input.gender,
          dob: input.dob,
          password: hashed_password,
          language: input.language,
          cv: input.cv,
          medical: input.medical,
          role: input.role,
        },
        tx
      );

      await Promise.all([
        // create certification
        certificationRepository.createCertification(
          input.certifications,
          newUser.id,
          tx
        ),
        // create payment
        paymentRepository.createPayment(
          {
            actNo: input.actNo,
            bank: input.bank,
          },
          newUser.id,
          tx
        ),
        // create verification
        verificationRepository.createVerification(
          {
            type: input.type,
            doc: input.doc,
            id: input.no,
            expiry: input.expiry,
          },
          newUser.id,
          tx
        ),
        // create service
        serviceRepository.createService(input.services, newUser.id, tx),
      ]);

      const { cookie, session } =
        await authenticationService.createSession(newUser);

      return {
        cookie,
        session,
      };
    } catch (error) {
      throw error;
    }
  };

export type ISignUpAccountOwnerUseCase = ReturnType<
  typeof signUpAccountOwnerUseCase
>;

export const signUpAccountOwnerUseCase =
  (
    usersRepository: IUsersRepository,
    addressRepository: IAddressRepository,
    verificationRepository: IVerificationRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: allSignUppAccountOwnerSchemaType,
    tx?: ITransaction
  ): Promise<{
    session: Session;
    cookie: Cookie;
  }> => {
    const existingUser = await usersRepository.getUserByEmail(input.email);

    if (existingUser) {
      throw new AuthenticationError('Email taken');
    }

    const hashed_password = await authenticationService.generateHash(
      input.password
    );

    try {
      // create user
      const newUser = await usersRepository.createUser(
        {
          fname: input.fname,
          lname: input.lname,
          email: input.email,
          gender: input.gender,
          dob: input.dob,
          password: hashed_password,
          language: input.language,
          cv: '',
          medical: 'No',
          role: 'AccountOwner',
        },
        tx
      );

      console.log('[HERE]');

      await Promise.all([
        verificationRepository.createVerification(
          {
            type: input.type,
            doc: input.doc,
            id: input.no,
            expiry: input.expiry,
          },
          newUser?.id,
          tx
        ),

        addressRepository.createAddress(
          {
            country: input.country,
            state: input.state,
            street: input.street,
            other: input.other,
            address: input.address,
          },
          newUser.id,
          tx
        ),
      ]);

      const { cookie, session } =
        await authenticationService.createSession(newUser);

      return {
        cookie,
        session,
      };
    } catch (error) {
      console.log('errormessage', (error as Error).message);
      throw error;
    }
  };
