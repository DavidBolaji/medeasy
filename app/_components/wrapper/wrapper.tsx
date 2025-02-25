import React, { PropsWithChildren } from 'react';

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="max-w-7xl mx-auto lg:px-0 px-6">{children}</div>;
};

export default Wrapper;
