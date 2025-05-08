import { useAuthStore } from '@/stores/auth-store';

const Dashboard = () => {
  const { isAuthenticated } = useAuthStore();
  console.log(' isAuthenticated', isAuthenticated);
  return <div>Dashboard</div>;
};

export default Dashboard;
