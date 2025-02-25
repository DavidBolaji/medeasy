import { getInjection } from '@/di/container';

import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/src/entities/error/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';
import { WorkSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import WorkDetailsForm from './components/work-detail-form';
import { getWorkDetails } from './action';

interface WorkDetailsPageSearchParams {}
export const revalidate = 0;

export default async function WorkDetailsPage({}: WorkDetailsPageSearchParams) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let initialValues: WorkSchemaType;
  try {
    initialValues = await getWorkDetails(sessionId);
  } catch (error) {
    throw error;
  }
  return (
    <div className="max-w-lg">
      <WorkDetailsForm initialValues={initialValues} />
    </div>
  );
}
