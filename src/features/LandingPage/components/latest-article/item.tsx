import { formatDistance } from 'date-fns';
import { MessageCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import useArticleStore from '@/stores/article-store';

import type { ArticleType } from '@/type';

import { ActionDropdown } from './action-dropdown';

export const ArticleItem = ({ data }: { data: ArticleType }) => {
  const { isAuthenticated } = useAuthStore();
  const { setArticle } = useArticleStore();

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
      <div className="flex flex-col-reverse sm:mt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-5 font-extralight">
        <div className="flex-1 h-16 mt-1 sm:mt-0">
          <h3 className="text-2xl capitalize font-albertSans line-clamp-2">
            {data.title}
          </h3>
        </div>
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
          <span className="font-semibold">{data.user?.username}</span>
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
          <ActionDropdown
            user_id={data.user?.id ? data.user?.id : 0}
            document_id={data.documentId}
            onStoreArticle={() => {
              setArticle({
                document_id: data.documentId,
                category: data.category.id.toString(),
                cover_image_url: data.cover_image_url,
                description: data.description,
                title: data.title,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
