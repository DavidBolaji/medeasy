import React, { ComponentType, ReactNode } from 'react';
import { Dashboardcard } from '../dashboard-card';

interface NewUsersSectionProps {
  data: {
    icon: ComponentType<{ color?: string }>;
    title: string;
    value: string;
  }[];
}

const NewUsersSection: React.FC<NewUsersSectionProps> = ({ data }) => {
  const usersList = data.map((el) => (
    <div key={el.title} className="lg:col-span-3 col-span-9">
      <Dashboardcard icon={el.icon} value={el.value} title={el.title} />
    </div>
  ));

  return <div className="grid grid-cols-9 gap-4">{usersList}</div>;
};

export default NewUsersSection;
