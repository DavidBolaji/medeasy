import Typography from '@/app/_components/typography/typography';
import ExistingUsersSection from './_components/sections/existing-users';
import {
  getMonthlyCompleted,
  getRequestStat,
  getUserAccountStatus,
  getUserRoleCount,
} from './_service';
import {
  ReturnGetUserAccountStatusType,
  ReturnGetUserRoleCountType,
} from '@/src/entities/models/user';
import NewUsersSection from './_components/sections/new-users';
import Requests from './_components/sections/requests';
import { ReturnGetRequestStatType } from '@/src/entities/models/requests';

interface DashboardSearchParams {
  [key: string]: string;
}
export const revalidate = 0;

export default async function Dashboard({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  const [userCount, statusCount, requestStat, completedCount] =
    await Promise.all([
      getUserRoleCount(),
      getUserAccountStatus(),
      getRequestStat(),
      getMonthlyCompleted(),
    ]);

  return (
    <div className="bg-grey-200 p-4">
      <Typography className="font-semibold text-2xl mb-4">
        Existing Users
      </Typography>
      <ExistingUsersSection
        data={userCount.data as ReturnGetUserRoleCountType[]}
      />
      <Typography className="font-semibold text-2xl my-5">New Users</Typography>
      <NewUsersSection
        data={statusCount.data as ReturnGetUserAccountStatusType[]}
      />
      <Typography className="font-semibold text-2xl my-5">Requests</Typography>
      <Requests
        data={requestStat.data as ReturnGetRequestStatType[]}
        completed={completedCount?.data || []}
      />
    </div>
  );
}
