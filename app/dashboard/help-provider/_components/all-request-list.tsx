import type { ReturnAllRequestSchemaType } from '@/src/entities/models/requests';

import RenderAllRequestList from './render-all-request-list';

export default async function AllRequestList({
  requests,
}: {
  requests: ReturnAllRequestSchemaType[];
}) {
  return <RenderAllRequestList requests={requests} />;
}
