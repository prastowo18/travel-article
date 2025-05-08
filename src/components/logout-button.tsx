import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-500 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
