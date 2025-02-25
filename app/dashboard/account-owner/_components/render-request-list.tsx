'use client';
import RequestCard from '@/app/_components/card/request-card';
import Loading from '@/app/_components/loading';
import useLoading from '@/app/_hooks/use-loading';
import { ReturnRequestSchemaType } from '@/src/entities/models/requests';
import { Empty } from 'antd';
import React, { useEffect } from 'react';
import ViewOfferModal from './modal/view-offer-modal';
import ViewOfferDrawer from './modal/view-offer-drawer';

interface RenderRequestListProps {
  requests: ReturnRequestSchemaType[];
}

const RenderRequestList: React.FC<RenderRequestListProps> = ({ requests }) => {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [requests]);

  if (loading) {
    return <Loading />;
  }

  if (!loading && requests.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <Empty />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Render Request Cards */}
      {requests.map((request, ind) => (
        <div key={ind} className="lg:col-span-6 col-span-12">
          <RequestCard request={request} />
        </div>
      ))}
      <ViewOfferModal />
      <ViewOfferDrawer />
    </div>
  );
};

export default RenderRequestList;
