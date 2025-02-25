import { getInjection } from '@/di/container';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';
import { SignUpAddressSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import AddressForm from './_components/address-form';

interface AddressPageSearchParams {}
export const revalidate = 0;

async function getAddress(sessionId: string | undefined) {
  try {
    const getAddressForUserController = getInjection(
      'IGetAddressForUserController'
    );
    return await getAddressForUserController(sessionId);
  } catch (error) {
    if (
      error instanceof UnauthenticatedError ||
      error instanceof AuthenticationError
    ) {
      redirect('/start/account-owner/sign-in');
    }
    throw error;
  }
}

export default async function AddressPage({}: AddressPageSearchParams) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let initialValues: SignUpAddressSchemaType;
  try {
    initialValues = await getAddress(sessionId);
  } catch (error) {
    throw error;
  }
  return (
    <div className="max-w-lg">
      <AddressForm initialValues={initialValues} />
    </div>
  );
}
