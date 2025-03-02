import { cookies } from 'next/headers';
import { ActionSelector } from '../_components/action-selector';
import StartNav from '../_components/start-nav';
import { SESSION_COOKIE } from '@/config';
import { redirect } from 'next/navigation';

export default async function AccountOwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  // if (sessionId) {
  //   redirect(`/dashboard/account-owner/home?active=new`);
  // }
  return (
    <div>
      <StartNav />
      <div className="flex flex-col md:px-0 px-10 items-center justify-center w-full min-h-screen">
        <ActionSelector />
        {children}
      </div>
    </div>
  );
}
