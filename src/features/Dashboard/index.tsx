import { useAuthStore } from '@/stores/auth-store';

const Dashboard = () => {
  const { id, email, username } = useAuthStore();

  return (
    <div className="">
      <div className="">{id}</div>
      <div className="">{email}</div>
      <div className="">{username}</div>
    </div>
  );
};

export default Dashboard;
