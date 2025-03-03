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
  if (!sessionId) {
    return redirect('/start/account-owner/sign-in');
  }
  try {
    const role = await getUserRole(sessionId);

    if (role !== 'AccountOwner') {
      return redirect('/start/account-owner/sign-in');
    }
  } catch (error) {
    console.log((error as Error).message);
  }
  return <div>{children}</div>;
}
