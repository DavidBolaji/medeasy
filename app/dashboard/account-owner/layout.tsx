import { SESSION_COOKIE } from '@/config';
import { UnauthorizedError } from '@/src/entities/error/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { getUserRole } from '../layout';

export default async function AccountOwnerDashboardLayout({
  children,
}: PropsWithChildren) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const role = await getUserRole(sessionId);

    if (role !== 'AccountOwner') {
      throw new UnauthorizedError('Unauthorized');
    }
  } catch (error) {
    console.log((error as Error).message);
    redirect('/start/account-owner/sign-in');
  }
  return <div>{children}</div>;
}
