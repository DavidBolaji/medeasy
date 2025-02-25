import { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { getPersonalDetails } from '../../layout';
import { Sidebar } from './_components/sidebar';
import { DashboardHeader } from './_components/dashboard-header';
import { DashboardHeaderTwo } from './_components/dashboard-header-two';

export default async function AccountOwnerDashboardMainLayout({
  children,
}: PropsWithChildren) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let initialValues: SignUpTwoSchemaType;
  try {
    initialValues = await getPersonalDetails(sessionId);
  } catch (error) {
    throw error;
  }
  return (
    <Layout
      style={{
        overflowY: 'hidden',
        height: '100vh',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div className="absolute">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <Layout>
          <DashboardHeader user={initialValues} />
          <DashboardHeaderTwo />
          <Content
            style={{
              minHeight: '89vh',
              height: '89vh',
              backgroundColor: 'white',
              padding: '32px 32px 150px 32px',
            }}
            className={`overflow-auto scrollbar-hide `}
          >
            {children}
          </Content>
        </Layout>
      </div>
    </Layout>
  );
}
