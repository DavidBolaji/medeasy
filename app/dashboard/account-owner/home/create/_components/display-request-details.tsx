'use client';
import SafeHTML from '@/app/_components/safe-html';
import Typography from '@/app/_components/typography/typography';
import useRequest from '@/app/_hooks/use-request';
import { Divider } from 'antd';
import { Dot } from 'lucide-react';
import React from 'react';

const DisplayRequestDetails = () => {
  const { requestData } = useRequest();
  return (
    <div>
      <Typography as="h4" className="text-2xl text-[#5C698A] font-medium mb-4">
        This is how your request will be displayed to help providers.
      </Typography>
      <div className="">
        {/* header detail */}
        <div className="flex justify-between">
          <span className="text-sm text-[#5C698A] font-instrument">
            Posted just now
          </span>
          <span className="inline-block px-4 py-2 bg-[#D6E2FF] rounded-2xl">
            <Typography as="p" className="text-xs text-[#214395]">
              {requestData?.service}
            </Typography>
          </span>
        </div>
        <Divider />
        {/* title */}
        <div>
          <Typography as="h4" className="text-black text-2xl font-medium mb-2">
            Help Needed: {requestData?.title}
          </Typography>
        </div>
        {/* sub */}
        <div className="flex text-[#5C698A] font-medium pb-2">
          <div className="text-sm text-[#5C698A] font-medium mr-2">
            Paid: {requestData?.price} (
            {requestData?.negotiable ? 'Negotiable' : 'Not negotiable'})
          </div>
          <Dot />
          <div className="mx-2 text-sm">{requestData?.duration}</div>
          <Dot />
          <div className="ml-2 text-sm">{requestData?.location}</div>
        </div>
        {/* Requirements */}
        <div>
          <SafeHTML
            content={requestData?.description as unknown as HTMLElement}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayRequestDetails;
