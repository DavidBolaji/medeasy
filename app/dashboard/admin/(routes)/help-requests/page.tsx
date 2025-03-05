import { getRequestStat } from '../home/_service';
import { Dashboardcard } from '../home/_components/dashboard-card';
import { getAllRequest } from './action';
import RequestTable from '../_components/table/request-table/request-table';

interface DashboardSearchParams {
  [key: string]: string;
}
export const revalidate = 0;

export default async function HelpRequestsPage({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;
  const sort = searchParams.sort || 'createdAt';
  const sortOrder = searchParams.sortOrder || 'asc';
  const searchQuery = searchParams.searchQuery || '';

  const request = getRequestStat();

  const allRequest = getAllRequest({
    page,
    limit,
    sort,
    sortOrder,
    searchQuery,
  });

  const [reqStat, reqList] = await Promise.all([request, allRequest]);

  return (
    <div
      style={{
        padding: '16px 16px 150px 16px',
      }}
    >
      <div className="bg-grey-200 p-4">
        <div className="grid grid-cols-6 gap-4">
          {reqStat.data
            ? reqStat?.data.map((el, i) => (
                <div key={i} className="lg:col-span-2 col-span-6">
                  <Dashboardcard
                    key={el.title}
                    icon={el.icon}
                    value={el.value}
                    title={el.title}
                  />
                </div>
              ))
            : null}
        </div>
        <RequestTable
          initialCustomers={reqList?.data?.requests ?? []}
          totalPages={reqList?.data?.totalPages}
          page={page}
          itemsPerPage={limit}
        />
      </div>
    </div>
  );
}
