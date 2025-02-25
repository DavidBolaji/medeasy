'use client';

import { Tabs, TabsList, TabsTrigger } from '@/app/_components/ui/tabs2';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ActionSelector() {
  const path = usePathname();
  const isHelpProvider = path.split('/').includes('help-provider');
  const isSignUp = path.split('/').includes('sign-up');

  return (
    <Tabs
      defaultValue={isHelpProvider ? 'help-provider' : 'account-owner'}
      className={`md:w-[428px] w-full ${isSignUp ? 'hidden' : ''}`}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="help-provider" asChild>
          <Link href={'/start/help-provider/sign-in'}>Help Provider</Link>
        </TabsTrigger>
        <TabsTrigger value="account-owner" asChild>
          <Link href={'/start/account-owner/sign-in'}>Account Owner</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
