'use client';
import { Button } from '@/app/_components/ui/button';
import { cn, getPath } from '@/app/_lib/utils';
import {
  RequestStatus,
  RequestTabsProps,
} from '@/src/entities/models/requests';
import { handleChangeTab } from '../action';
import Link from 'next/link';
import { tabs } from '@/app/_lib/data';
import { useState } from 'react';
import useLoading from '@/app/_hooks/use-loading';
import { usePathname } from 'next/navigation';

export function RequestTabs({ activeTab }: RequestTabsProps) {
  const [aTab, setATab] = useState(activeTab);
  const { setLoading } = useLoading();
  const path = usePathname();
  const url = getPath(path);
  const handleChange = (status: RequestStatus) => {
    setLoading(true);
    setATab(status);
    handleChangeTab(status, url);
  };

  return (
    <div className="flex items-center h-14 justify-between my-10">
      <div className="flex gap-8 translate-y-2.5 text-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              'pb-4 md:text-sm text-xs font-medium text-nowrap  transition-colors hover:text-primary relative',
              aTab === tab.id
                ? 'border-b-2 border-primary'
                : 'text-muted-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {url === 'account-owner' ? (
        <Button className="md:block hidden" variant={'secondary'} asChild>
          <Link href="/dashboard/account-owner/home/create">
            Request for help
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
