import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from '@/config';

import { ActionSelector } from '../_components/action-selector';
import StartNav from '../_components/start-nav';

export default async function HelpProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  if (sessionId) {
    redirect(`/dashboard/help-provider/home?active=new`);
  }

  return (
    <div>
      <StartNav />
      <div className="flex flex-col items-center justify-center w-full md:px-0 px-5 min-h-screen">
        <ActionSelector />
        {children}
      </div>
    </div>
  );
}
