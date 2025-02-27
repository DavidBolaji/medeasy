import React, { ComponentType } from 'react';
import { Dashboardcard } from '../dashboard-card';
import CompletedChart from '../completed-chart';

interface RequestsProps {
  data: {
    icon: ComponentType<{ color?: string }>;
    title: string;
    value: string;
  }[];
  completed: { month: string; completed: number }[];
}

const Requests: React.FC<RequestsProps> = ({ data, completed }) => {
  const usersList = data.map((el) => (
    <Dashboardcard
      key={el.title}
      icon={el.icon}
      value={el.value}
      title={el.title}
    />
  ));

  return (
    <div className="grid md:grid-cols-12 grid-cols-8 gap-4">
      <div className="md:col-span-4 col-span-8 space-y-4">{usersList}</div>
      <div className="col-span-8">
        <CompletedChart monthlyCompleted={completed} />
      </div>
    </div>
  );
};

export default Requests;
