'use server';

import { RequestStatus } from '@/src/entities/models/requests';
import { redirect } from 'next/navigation';

export const handleChangeTab = async (state: RequestStatus, url: string) => {
  redirect(`/dashboard/${url}/home?active=${state}`);
};
