import { Button } from '@/components/ui/button';
import { handleLogin } from '@/services/handleLogin';

const Login = () => {
  const onSubmit = async () => {
    try {
      await handleLogin();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <Button onClick={onSubmit}>Login</Button>
    </div>
  );
};

export default Login;
