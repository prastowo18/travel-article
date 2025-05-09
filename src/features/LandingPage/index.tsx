import LogoutButton from '@/components/logout-button';
import { useAuthStore } from '@/stores/auth-store';

const LandingPage = () => {
  const { id, email, username } = useAuthStore();
  return (
    <div>
      <LogoutButton />
      <div className="">{id}</div>
      <div className="">{email}</div>
      <div className="">{username}</div>
    </div>
  );
};

export default LandingPage;
