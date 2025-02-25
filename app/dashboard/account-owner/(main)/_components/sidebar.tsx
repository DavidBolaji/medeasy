'use client';

import { Grid, MenuProps, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Images } from '@/app/_constants/images';
import { MenuStyled } from './dashboard.styles';
import usePath from '@/app/dashboard/help-provider/(main)/_hooks/use-path';

const { useBreakpoint } = Grid;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Personal Details', '/dashboard/account-owner/personal-details'),
  getItem('Address', '/dashboard/account-owner/address'),
  getItem('ID Verification', '/dashboard/account-owner/id-verification'),
  // getItem('Account Manager', '/dashboard/account-owner/account-manager'),
];

export const Sidebar = () => {
  const { locationCurrent } = usePath();
  const screen = useBreakpoint();
  const router = useRouter();
  return (
    screen.lg && (
      <Sider
        trigger={null}
        style={{
          backgroundColor: '#fff',
          height: '100vh',
          maxHeight: '100vh',
          position: 'fixed',
          top: 0,
          borderRight: '1px solid #E4E4EF',
        }}
        width={256}
      >
        <div className="ml-8 mt-4 translate-y-4 mb-10">
          <Image width={100} height={40} src={Images.Logo} alt="Medeasy logo" />
        </div>
        <div className="h-[72px] flex pl-10 items-center">
          <Typography className="font-semibold text-5xl text-center">
            Manage profile
          </Typography>
        </div>
        <MenuStyled
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[locationCurrent]}
          selectedKeys={[locationCurrent]}
          onClick={(menuInfo: { key: string }) => router.push(menuInfo?.key)}
          items={items.filter(() => {
            return true;
          })}
        />
      </Sider>
    )
  );
};
