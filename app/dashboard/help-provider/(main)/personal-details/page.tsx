import PersonalDetailsForm from './_components/personal-form';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { getPersonalDetails } from '@/app/dashboard/layout';

interface PersonalDetailsPageSearchParams {}
export const revalidate = 0;

export default async function PersonalDetailsPage({}: PersonalDetailsPageSearchParams) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let initialValues: SignUpTwoSchemaType;
  try {
    initialValues = await getPersonalDetails(sessionId);
  } catch (error) {
    throw error;
  }
  return (
    <div className="max-w-lg">
      <PersonalDetailsForm initialValues={initialValues} />
    </div>
  );
}
