import DashboardLoginForm from "./_components/dashboard-login-form";


export const revalidate = 0;

export default async function DashboardAuthPage({}) {
  return <div className="bg-grey-200 md:px-0 px-4 flex items-center justify-center w-full  h-screen">
    <DashboardLoginForm />
  </div>;
}
