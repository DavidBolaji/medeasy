'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const usePath = () => {
  const pathname = usePathname();
  const [locationCurrent, setLoc] = useState('');

  useEffect(() => {
    const key =
      pathname === '/dashboard/help-provider/personal-details'
        ? '/dashboard/help-provider/personal-details'
        : pathname === '/dashboard/account-owner/personal-details'
          ? '/dashboard/account-owner/personal-details'
          : pathname === '/dashboard/account-owner/address'
            ? '/dashboard/account-owner/address'
            : pathname === '/dashboard/help-provider/services-offered'
              ? '/dashboard/help-provider/services-offered'
              : pathname === '/dashboard/help-provider/work-experience'
                ? '/dashboard/help-provider/work-experience'
                : pathname === '/dashboard/account-owner/id-verification'
                  ? '/dashboard/account-owner/id-verification'
                  : pathname === '/dashboard/help-provider/id-verification'
                    ? '/dashboard/help-provider/id-verification'
                    : pathname === '/dashboard/help-provider/payment-details'
                      ? '/dashboard/help-provider/payment-details'
                      : pathname?.split('/')[pathname?.split('/').length - 1];
    setLoc(key);
  }, [pathname]);

  return { locationCurrent };
};

export default usePath;
