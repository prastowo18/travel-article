import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useAuthStore } from '@/stores/auth-store';

import { LatestArticle } from '@/contants';

export const LatestArticleSection = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="px-5 lg:px-7">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="">
          {!isAuthenticated && (
            <Badge variant="secondary_2" className="mb-4">
              Demo
            </Badge>
          )}

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
          {LatestArticle.map((e, i) => (
            <div className="relative p-5 rounded-lg shadow-lg" key={i}>
              <div
                className="w-full h-[200px] rounded-lg"
                style={{
                  backgroundImage: `url('${e.img}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="flex flex-col-reverse sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 font-extralight">
                <h3 className="flex-1 mt-1 text-2xl sm:mt-0 font-albertSans ">
                  {e.title}
                </h3>
                <div className="flex items-center gap-1 mt-5 sm:mt-0">
                  <MessageCircle className="size-4" />
                  <p className="">5</p>
                </div>
              </div>
              <p className="mt-2 text-sm line-clamp-2 font-extralight">
                {e.description}
              </p>
              <div className="absolute flex items-center justify-between left-7 right-7 top-8">
                <div className="flex items-center gap-1 px-2 py-1 bg-transparent rounded-md shadow-md">
                  <MapPin className="size-4" />
                  <p className="text-sm">{e.location}</p>
                </div>
                <div className="">
                  <Button
                    size="icon"
                    className="text-black bg-transparent bg-white rounded-full shadow-md hover:text-white"
                  >
                    <ArrowUpRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
