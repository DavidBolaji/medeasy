import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';
import { ServiceSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import ServiceDetailsForm from './components/service-form';
import { getServiceDetails } from './action';

interface ServiceDetailsPageSearchParams {}
export const revalidate = 0;

export default async function ServiceDetailsPage({}: ServiceDetailsPageSearchParams) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let initialValues: ServiceSchemaType;
  try {
    //@ts-ignore
    initialValues = { services: await getServiceDetails(sessionId) };
  } catch (error) {
    throw error;
  }
  return (
    <div className="max-w-lg">
      <ServiceDetailsForm initialValues={initialValues} />
    </div>
  );
}
