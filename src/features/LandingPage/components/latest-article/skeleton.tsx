import { Skeleton } from '@/components/ui/skeleton';

export const ArticleSkeletonLoading = () => {
  return (
    <div className="p-5 rounded-lg shadow-lg">
      <Skeleton className="w-full h-[200px] rounded-lg" />
      <div className="mt-5">
        <Skeleton className="h-10" />
        <div className="flex flex-col gap-1 mt-5">
          <Skeleton className="h-5" />
          <Skeleton className="w-1/2 h-5" />
          <Skeleton className="w-2/3 h-5" />
        </div>
      </div>
    </div>
  );
};
