'use client';

import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import Image from 'next/image';
import { useNotification } from '@/app/_hooks/use-notification';
import { Grid } from 'antd';
import { X } from 'lucide-react';
import Typography from '../typography/typography';
import { Images } from '@/app/_constants/images';

const { useBreakpoint } = Grid;

export const NotificationDrawer = () => {
  const { notificationDrawer, close } = useNotification();
  const screen = useBreakpoint();

  const notificationStyle = classNames(
    'border-b-4 bg-white relative z-50 shadow-2xl rounded-e-sm md:w-[600px] h-[102px] p-4 flex gap-4 items-start relative',
    {
      'border-b-[#E83B3B]': notificationDrawer?.type === 'error',
    },
    {
      'border-b-[#7DBA00]': notificationDrawer?.type === 'success',
    },
    {
      'border-b-[#23342A]': notificationDrawer?.type === 'info',
    }
  );

  const notificationStyleMobile = classNames(
    'border-b-4 bg-white w-11/12 z-40 shadow-2xl rounded-e-sm h-[152px] p-4 flex gap-4 items-start relative',
    {
      'border-b-[#E83B3B]': notificationDrawer?.type === 'error',
    },
    {
      'border-b-[#7DBA00]': notificationDrawer?.type === 'success',
    },
    {
      'border-b-[#23342A]': notificationDrawer?.type === 'info',
    }
  );

  return (
    <AnimatePresence mode="wait">
      {screen.lg && notificationDrawer?.show && (
        <motion.div
          initial={{
            position: 'fixed',
            bottom: 48,
            right: -50,
            x: 0,
          }}
          animate={{
            x: -68,
            transition: { type: 'spring', stiffness: 200, duration: 600 },
          }}
          exit={{
            x: 700,
          }}
          className={notificationStyle}
        >
          <div
            className="cursor-pointer absolute right-4 top-4"
            onClick={close}
          >
            <X size="24" color="#92B09F" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center relative rounded-full bg-grey-200">
            <Image
              fill
              src={Images.ICON}
              alt="Medeasy favlogo"
              className="w-10 h-10 scale-75 absolute"
            />
          </div>
          <div>
            <Typography as="p" align="left" className="black-100 pb-2">
              {notificationDrawer.title}
            </Typography>
            <Typography
              as="p"
              align="left"
              className="black-300 font-medium text-[16px] leading-5 max-w-[472px]"
            >
              {notificationDrawer.message}
            </Typography>
            {/* <Button
              onClick={close}
              color="light"
              size="lg"
              className="border-0 bg-black-600 p-2 h-8 flex items-center justify-center"
            >
              Retry
            </Button> */}
          </div>
        </motion.div>
      )}

      {!screen.lg && notificationDrawer?.show && (
        <div className="">
          <motion.div
            initial={{
              position: 'fixed',
              bottom: 48,
              right: -50,
              x: 0,
            }}
            animate={{
              x: -68,
              transition: { type: 'spring', stiffness: 200, duration: 600 },
            }}
            exit={{
              x: 700,
            }}
            className={notificationStyleMobile}
          >
            <div
              className="cursor-pointer absolute right-4 top-4"
              onClick={close}
            >
              <X size="24" color="#92B09F" />
            </div>
            <div className="w-10 h-10 relative flex items-center justify-center rounded-full bg-grey-200">
              <Image
                fill
                src={Images.ICON}
                alt="Medeasy favlogo"
                className="w-10 h-10 scale-75 absolute"
              />
            </div>
            <div>
              <Typography as="p" align="left" className="black-100 pb-2">
                {notificationDrawer.title}
              </Typography>
              <Typography
                as="p"
                align="left"
                className="black-300 font-medium text-[16px] leading-5 mb-3 max-w-[472px]"
              >
                {notificationDrawer.message}
              </Typography>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
