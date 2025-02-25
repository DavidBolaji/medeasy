'use client';
import RequestAllCard from '@/app/_components/card/request-all-card';
import Loading from '@/app/_components/loading';
import useLoading from '@/app/_hooks/use-loading';
import { ReturnAllRequestSchemaType } from '@/src/entities/models/requests';
import { Empty } from 'antd';
import React, { useEffect } from 'react';

interface RenderAllRequestListProps {
  requests: ReturnAllRequestSchemaType[];
}

const RenderAllRequestList: React.FC<RenderAllRequestListProps> = ({
  requests,
}) => {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [requests]);

  if (loading) {
    return <Loading />;
  }

  if (!loading && requests.length === 0) {
    return (
      <div className="flex items-center md:h-[50%] md:w-full w-[95%] justify-center">
        <Empty />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 gap-4">
      {/* Render Request Cards */}
      {requests.map((request, ind) => (
        <div key={ind} className="col-span-6">
          <RequestAllCard request={request} />
        </div>
      ))}
    </div>
  );
};

export default RenderAllRequestList;
