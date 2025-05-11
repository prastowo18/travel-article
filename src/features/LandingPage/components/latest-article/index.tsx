import type { ArticleType } from '@/type';

import { ArticleItem } from './item';
import { ArticleSkeletonLoading } from './skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Props {
  data: ArticleType[];
  isLoading: boolean;
}

export const LatestArticleSection = ({ data, isLoading }: Props) => {
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
      <div className="flex flex-col pt-16">
        <Button asChild className="font-light mb-7 w-fit bg-primary_2">
          <Link to="/articles">Show more articles</Link>
        </Button>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 4 }, (_, index) => (
              <ArticleSkeletonLoading key={index} />
            ))
          ) : (
            <>
              {data.map((e, i) => (
                <ArticleItem key={i} data={e} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
