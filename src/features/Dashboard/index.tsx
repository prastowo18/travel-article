import { useAuthStore } from '@/stores/auth-store';

const Dashboard = () => {
  const { username } = useAuthStore();

  return (
    <div className="flex flex-col flex-1">
      <div className="@container/main flex flex-1 flex-col gap-2 lg:items-center lg:justify-center">
        <div className="flex flex-col px-5 lg:flex-row lg:items-center lg:px-0">
          <div className="w-full lg:w-3/4 sm:mt-10 lg:mt-0">
            <img
              src="/dashboard-img.svg"
              className="w-[500px] h-[500px] mx-auto "
              alt="dashboard"
            />
          </div>
          <div className="mt-10 lg:w-3/4 lg:mt-0">
            <h1 className="mb-3 text-4xl font-medium capitalize font-poppins">
              Welcome, {username}
            </h1>
            <p className="font-light">
              Here, you'll find everything you need to stay organized, track
              your progress, and manage your tasks efficiently. We're glad to
              have you on board—let's make today productive and meaningful!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
