'use client';

import { Header } from 'antd/es/layout/layout';

import React, { useState } from 'react';

import Typography from '@/app/_components/typography/typography';
import usePath from '@/app/dashboard/help-provider/(main)/_hooks/use-path';
import { usePathname, useRouter } from 'next/navigation';
import { cn, getPath } from '@/app/_lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const hash = {
  'personal-details': 'Personal Details',
  address: 'Address',
  'id-verification': 'ID Verification',
  'account-manager': 'Account Manager',
};

export const DashboardHeaderTwo = () => {
  const [visible, setVisible] = useState(false);
  const { locationCurrent } = usePath();
  const router = useRouter();
  const path = usePathname();
  const url = getPath(path);

  const a =
    locationCurrent?.split('/')[locationCurrent?.split('/')?.length - 1];

  const currentPath = hash[a as keyof typeof hash];

  const handleMenuClick = () => {
    setVisible((prev) => !prev);
  };

  const handleDropdownClick = (key: string) => {
    // Implement the logic to handle dropdown item click
    router.push(`/dashboard/${url}/${key}`);
    handleMenuClick();
  };

  return (
    <div className="flex flex-col">
      <Header
        style={{
          paddingLeft: 0,
          paddingRight: '40px',
          background: '#fff',
          height: 72,
          backgroundColor: '#517DF0',
          marginBottom: 0,
          paddingBottom: 0,
        }}
      >
        <div className="flex items-center  h-full w-full">
          <div className="relative flex pl-7 items-center justify-between w-full">
            <Typography
              as="h4"
              className="text-lg text-white w-full font-semibold"
            >
              {currentPath}
            </Typography>

            <motion.button
              className="md:hidden text-white"
              onClick={() => setVisible(!visible)}
              animate={{ rotate: visible ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={20} />
            </motion.button>
          </div>
        </div>
      </Header>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full px-4 py-3 md:hidden overflow-hidden"
          >
            {Object.entries(hash).map(([key, value]) => (
              <motion.button
                key={key}
                className={cn(
                  'w-full text-left px-4 py-4 hover:bg-primary hover:text-white font-instrument',
                  {
                    'bg-primary text-white': key === a,
                  }
                )}
                onClick={() => handleDropdownClick(key)}
                whileTap={{ scale: 0.98 }}
              >
                {value}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
