import { formatDistance } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical, MessageCircle } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useAuthStore } from '@/stores/auth-store';

import { cn } from '@/lib/utils';
import type { ArticleType } from '@/type';

interface Props {
  data: ArticleType[];
  isLoading: boolean;
}

export const LatestArticleSection = ({ data, isLoading }: Props) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="px-5 lg:px-7">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="">
          <p className="text-sm font-light underline text-primary_2 underline-offset-4 decoration-primary_2">
            Latest Article
          </p>
          <h2 className="mt-3 text-4xl font-light font-albertSans">
            Fresh Off the Path<span className="block">New Articles</span>
          </h2>
        </div>
        <div className="flex w-full mt-3 sm:w-[45%] sm:items-end lg:w-1/4 sm:mt-0">
          <p className="text-sm font-light">
            Discover the newest travel articles written by explorers around the
            world, capturing real moments, reflections, and journeys worth
            sharing.
          </p>
        </div>
      </div>
      <div className="pt-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 4 }, (_, index) => (
              <ArticleSkeletonLoading key={index} />
            ))
          ) : (
            <>
              {data.map((e, i) => (
                <ArticleItem
                  key={i}
                  data={e}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ArticleItem = ({
  isAuthenticated,
  data,
}: {
  isAuthenticated: boolean | null;
  data: ArticleType;
}) => {
  return (
    <div className="relative p-5 rounded-lg shadow-lg">
      <div
        className="w-full h-[200px] rounded-lg"
        style={{
          backgroundImage: `url('${data.cover_image_url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="flex flex-col-reverse sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 font-extralight">
        <h3 className="flex-1 mt-1 text-2xl capitalize sm:mt-0 font-albertSans">
          {data.title}
        </h3>
        <div className="flex items-center gap-1 mt-5 sm:mt-0">
          <MessageCircle className="size-4" />
          <p className="">{data.comments ? data.comments.length : 0}</p>
        </div>
      </div>
      <div className="h-10 mb-3">
        <p className="mt-2 text-sm line-clamp-2 font-extralight">
          {data.description}
        </p>
      </div>
      {isAuthenticated && (
        <p className="text-xs tracking-wide capitalize font-extralight">
          Published by:{' '}
          <span className="font-semibold">{data.user.username}</span>
        </p>
      )}
      <p className="mt-1 text-xs font-medium text-gray-700">
        {formatDistance(new Date(data.createdAt), new Date(), {
          addSuffix: true,
        }).replace('about', '')}
      </p>
      <div
        className={cn(
          'absolute flex items-center justify-end left-7 right-7 top-8',
          data.category && 'justify-between'
        )}
      >
        {data.category && (
          <div className="flex items-center gap-1 px-2 py-1 text-white rounded-md bg-black/80">
            <p className="text-xs">{data.category.name}</p>
          </div>
        )}
        <div className="">
          <ActionDropdown />
        </div>
      </div>
    </div>
  );
};

const ArticleSkeletonLoading = () => {
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

const ActionDropdown = () => {
  const navigate = useNavigate();
  // const { username, email } = useAuthStore();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="text-black bg-transparent bg-white rounded-full shadow-md hover:text-white"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute w-48 -right-5">
          <DropdownMenuLabel className="">Detail Action</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
