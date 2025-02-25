import { getInjection } from '@/di/container';

import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';
import { SignUpFourSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import VerificationForm from '@/app/dashboard/help-provider/(main)/id-verification/_components/verification-form';

interface VerificationPageSearchParams {}
export const revalidate = 0;

async function getVerification(sessionId: string | undefined) {
  try {
    const getVerificationForUserController = getInjection(
      'IGetVerificationForUserController'
    );
    return await getVerificationForUserController(sessionId);
  } catch (error) {
    if (
      error instanceof UnauthenticatedError ||
      error instanceof AuthenticationError
    ) {
      redirect('/start/help-provider/sign-in');
    }
    throw error;
  }
}

export default async function VerificationPage({}: VerificationPageSearchParams) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let initialValues: SignUpFourSchemaType;
  try {
    initialValues = await getVerification(sessionId);
  } catch (error) {
    throw error;
  }
  return (
    <div className="max-w-lg">
      <VerificationForm initialValues={initialValues} />
    </div>
  );
}
