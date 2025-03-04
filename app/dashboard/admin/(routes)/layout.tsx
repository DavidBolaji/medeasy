import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Sidebar } from './_components/sidebar';
import Loading from '@/app/_components/navigating';
import { DashboardHeader } from './_components/dashboard-header';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';
import { redirect } from 'next/navigation';
import { DeleteModal } from './_components/delete-modal/delete-modal';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!sessionId) {
    return redirect('/dashboard/admin');
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
      <div className="lg:ml-64">
        <Layout>
          <DashboardHeader />
          <Content
            style={{
              minHeight: '89vh',
              height: '89vh',
              backgroundColor: 'white',
              // padding: '16px 16px 150px 16px',
            }}
            className={`overflow-auto scrollbar-hide `}
          >
            <Loading />
            {children}
            <DeleteModal />
          </Content>
        </Layout>
      </div>
    </Layout>
  );
}
