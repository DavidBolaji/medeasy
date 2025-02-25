'use client';
import React from 'react';
import useLoading from '../_hooks/use-loading';

const Loading = () => {
  const { loading } = useLoading();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return null;
};

export default Loading;
