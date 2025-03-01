import RoleCard from '../role-card';

interface ExistingUsersSectionProps {
  data: {
    text: string;
    value: string;
  }[];
}

const ExistingUsersSection: React.FC<ExistingUsersSectionProps> = ({
  data,
}) => {
  const usersList = data?.map((el) => (
    <div key={el.text} className="col-span-6">
      <RoleCard text={el.text} value={el.value} />
    </div>
  ));

  return (
    <div className="grid md:grid-cols-12 col-span-6 gap-4">{usersList}</div>
  );
};

export default ExistingUsersSection;
