import { ReturnGetUserRoleCountType } from '@/src/entities/models/user';
import { getUserRoleCount } from '../home/_service';
import ExistingUsersSection from '../home/_components/sections/existing-users';
import CustomerTable from '../_components/table/customer-table/customer-table';
import { getAllUsers } from './action';

interface DashboardSearchParams {
  [key: string]: string;
}
export const revalidate = 0;

export default async function Dashboard({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;
  const sort = searchParams.sort || 'createdAt';
  const sortOrder = searchParams.sortOrder || 'asc';
  const searchQuery = searchParams.searchQuery || '';

  const customerRequest = getAllUsers({
    page,
    limit,
    sort,
    sortOrder,
    searchQuery,
  });

  const [userCount, users] = await Promise.all([
    getUserRoleCount(),
    customerRequest,
  ]);

  return (
    <div
      style={{
        padding: '16px 16px 150px 16px',
      }}
    >
      <div className="bg-grey-200 p-4">
        <ExistingUsersSection
          data={userCount.data as ReturnGetUserRoleCountType[]}
        />
        <CustomerTable
          initialCustomers={users?.data?.users ?? []}
          totalPages={users?.data?.totalPages}
          page={page}
          itemsPerPage={limit}
        />
      </div>
    </div>
  );
}
