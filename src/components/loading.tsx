import { Loader } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen gap-5">
      <div className="animate-spin">
        <Loader />
      </div>
      <div className="">
        <h1 className="text-2xl font-medium tracking-tight font-albertSans">
          <span className="text-primary_2">Trail</span>.Script
        </h1>
        <p className="-mt-1 tracking-wider font-albertSans font-extralight">
          Loading...
        </p>
      </div>
    </div>
  );
};
