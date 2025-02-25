import Footer from '@/app/_components/footer/footer';
import { SESSION_COOKIE } from '@/config';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { cookies } from 'next/headers';
import { getPersonalDetails } from '../../layout';
import { DashboardHeader } from '../(main)/_components/dashboard-header';
import BottomButtons from '../_components/bottom-buttons';

export default async function AccountOwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let initialValues: SignUpTwoSchemaType;
  try {
    initialValues = await getPersonalDetails(sessionId);
  } catch (error) {
    throw error;
  }
  return (
    <div>
      <div className="sticky top-0 z-50">
        <DashboardHeader user={initialValues} isHome={true} />
      </div>
      {children}
      <Footer />
      <BottomButtons />
    </div>
  );
}
