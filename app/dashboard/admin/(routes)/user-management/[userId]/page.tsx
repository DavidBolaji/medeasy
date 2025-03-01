interface DashboardSearchParams {
  [key: string]: string;
}
export const revalidate = 0;

export default async function ViewUserPage({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  return <div className="bg-grey-200 p-4">view</div>;
}
