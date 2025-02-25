import { getInjection } from '@/di/container';
import PaymentDetailsForm from './_components/payment-form';
import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';
import { SignUpFiveSchemaType } from '@/src/entities/models/auth/sign-up-schema';

interface PaymentDetailsPageSearchParams {}
export const revalidate = 0;

async function getPaymentDetails(sessionId: string | undefined) {
  try {
    const getPaymentsForUserController = getInjection(
      'IGetPaymentsForUserController'
    );
    return await getPaymentsForUserController(sessionId);
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

export default async function PaymentDetailsPage({}: PaymentDetailsPageSearchParams) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let initialValues: SignUpFiveSchemaType;
  try {
    initialValues = await getPaymentDetails(sessionId);
  } catch (error) {
    throw error;
  }
  return (
    <div className="max-w-lg">
      <PaymentDetailsForm initialValues={initialValues} />
    </div>
  );
}
