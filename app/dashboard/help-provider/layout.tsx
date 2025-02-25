import { SESSION_COOKIE } from '@/config';
import { UnauthorizedError } from '@/src/entities/error/auth';
import { cookies } from 'next/headers';

import { PropsWithChildren } from 'react';
import { getUserRole } from '../layout';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function HelpProviderDashboardLayout({
  children,
}: PropsWithChildren) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  try {
    const role = await getUserRole(sessionId);

    if (role !== 'HelpProvider') {
      throw new UnauthorizedError('Unauthorized');
    }
  } catch (error) {
    console.log((error as Error).message);

    return redirect('/start/help-provider/sign-in');
  }
  return <div>{children}</div>;
}
