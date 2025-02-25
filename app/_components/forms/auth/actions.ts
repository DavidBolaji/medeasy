'use server';

import { getInjection } from '@/di/container';
import { AuthenticationError } from '@/src/entities/error/auth';
import {
  InputParseError,
  NextRedirect,
  PrismaError,
} from '@/src/entities/error/common';
import { signInSchemaType } from '@/src/entities/models/auth/login-schema';
import {
  allSignUppAccountOwnerSchemaType,
  allSignUpSchemaType,
} from '@/src/entities/models/auth/sign-up-schema';
import { Cookie } from '@/src/entities/models/cookie';
import {
  IVerifyUser,
  verifyUserSchema,
} from '@/src/entities/models/verification';
import { ROLE } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const roleHash = async (): Promise<{ [key: string]: string }> => ({
  HelpProvider: 'help-provider',
  AccountOwner: 'account-owner',
});

export async function signUp(data: allSignUpSchemaType) {
  let sessionCookie: Cookie;
  try {
    const signUpController = getInjection('ISignUpController');
    sessionCookie = await signUpController(data);

    const cookieInstance = await cookies();
    cookieInstance.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    if (
      error instanceof InputParseError ||
      error instanceof AuthenticationError
    ) {
      throw new Error(error.message);
    }
    console.log((error as Error).message);
    throw new Error('Something went wrong');
  }

  redirect('/dashboard/help-provider/success');
}

export async function signUpAccountOwner(
  data: allSignUppAccountOwnerSchemaType
) {
  let sessionCookie: Cookie;
  try {
    const signUpAccountOwnerController = getInjection(
      'ISignUpAccountOwnerController'
    );
    sessionCookie = await signUpAccountOwnerController(data);

    if (!sessionCookie) {
      throw new Error('Session cookie is missing.');
    }

    const cookieInstance = await cookies();
    cookieInstance.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    if (
      error instanceof InputParseError ||
      error instanceof AuthenticationError ||
      error instanceof PrismaError
    ) {
      throw new Error(error.message);
    }

    if (
      (error as Error).message ===
      `The "payload" argument must be of type object. Received null`
    )
      throw new Error('User with id exist');
    // console.log((error as Error).message);
    throw error;
  }

  redirect('/dashboard/account-owner/success');
}

export async function signIn(data: signInSchemaType, role: ROLE) {
  let sessionCookie: Cookie;
  const roleHashValue = await roleHash();
  try {
    const signInController = getInjection('ISignInController');
    sessionCookie = await signInController(data, role);

    const cookieInstance = await cookies();
    cookieInstance.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    if (
      error instanceof InputParseError ||
      error instanceof AuthenticationError
    ) {
      throw new Error(error.message);
    }

    throw new Error('Something went wrong');
  }
  redirect(`/dashboard/${[roleHashValue[role]]}/home?active=new`);
}

export async function verifyUser<T extends IVerifyUser>(
  data: T
): Promise<boolean> {
  try {
    const verificationController = getInjection('IVerificationController');
    const response = await verificationController<T>(
      data,
      verifyUserSchema,
      'validateUser'
    );
    return response as boolean;
  } catch (error) {
    if (
      error instanceof InputParseError ||
      error instanceof AuthenticationError
    ) {
      throw new Error(error.message);
    }
    console.log((error as Error).message);
    throw new Error('Something went wrong');
  }
}

export async function verifyUserAccount<T extends IVerifyUser>(data: T) {
  try {
    const verificationController = getInjection('IVerificationController');
    const response = await verificationController<T>(
      data,
      verifyUserSchema,
      'validateUserAccount'
    );
    return response as string;
  } catch (error) {
    if (
      error instanceof InputParseError ||
      error instanceof AuthenticationError
    ) {
      throw new Error(error.message);
    }
    console.log((error as Error).message);
    throw new Error('Something went wrong');
  }
}

export async function getBanks() {
  try {
    const IGetBanksForPaymentController = getInjection(
      'IGetBanksForPaymentController'
    );
    return await IGetBanksForPaymentController();
  } catch (err) {
    throw err;
  }
}
