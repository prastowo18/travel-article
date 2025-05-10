import { Link } from 'react-router-dom';
import { ArrowUpRight, Plane } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { useAuthStore } from '@/stores/auth-store';

export const MyArticleSection = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="px-5 lg:px-7">
      <div className="pt-32">
        <div className="grid grid-cols-1 gap-20 sm:gap-10 lg:gap-32 sm:grid-cols-2">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col-reverse py-8 rounded-lg lg:flex-row lg:justify-between lg:gap-10 px-7 bg-background_2">
              <div className="mt-5 sm:mt-0">
                <h3 className="text-2xl font-extralight font-albertSans">
                  Every Step of the Way
                </h3>
                <p className="mt-3 text-sm font-extralight font-albertSans">
                  Your travels are more than places visited — they're moments
                  felt, lessons learned, and stories worth telling. This is
                  where every step you've taken is remembered, written, and
                  shared with a world that loves to explore
                </p>
              </div>
              <div className="flex justify-end lg:justify-normal">
                <Button
                  size="icon"
                  className="text-white rounded-full bg-primary_2"
                >
                  <ArrowUpRight className="size-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <div className="relative w-full h-[300px] overflow-hidden rounded-lg group">
                  <img
                    src="/hero-img.jpg"
                    alt="Gambar"
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center transition duration-300 bg-black opacity-0 bg-opacity-40 group-hover:opacity-100">
                    <Button
                      asChild
                      size="icon"
                      className="text-black bg-transparent bg-white rounded-full shadow-md hover:bg-white"
                    >
                      <Link to="/hero-img.jpg" target="_blank">
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="relative w-full h-[100px] overflow-hidden rounded-lg group">
                  <img
                    src="/hero-img.jpg"
                    alt="Gambar"
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center transition duration-300 bg-black opacity-0 bg-opacity-40 group-hover:opacity-100">
                    <Button
                      asChild
                      size="icon"
                      className="text-black bg-transparent bg-white rounded-full shadow-md hover:bg-white"
                    >
                      <Link to="/hero-img.jpg" target="_blank">
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            {!isAuthenticated && (
              <Badge variant="secondary_2" className="mb-2">
                Demo
              </Badge>
            )}
            <p className="text-sm font-light underline text-primary_2 underline-offset-4 decoration-primary_2">
              My Article
            </p>
            <h2 className="mt-1 text-4xl font-light font-albertSans">
              Journey in Words
            </h2>
            <div className="flex flex-col gap-5 mt-10 font-extralight font-albertSans">
              {Array(4)
                .fill(undefined)
                .map((_, i) => (
                  <div
                    className={cn(
                      'flex items-center gap-5 px-5 rounded-3xl py-5',
                      i + 1 == 1 && 'bg-primary_2 text-white'
                    )}
                    key={i}
                  >
                    <div
                      className={cn(
                        'p-5 rounded-2xl bg-background_2 text-gray-700',
                        i + 1 == 1 && 'bg-[#5c7a84] text-white'
                      )}
                    >
                      <Plane className="size-6" />
                    </div>
                    <div className="">
                      <h3 className="text-xl">Hello</h3>
                      <p className="mt-2 text-sm">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Facilis at in maiores quia veniam totam,
                        blanditiis eius minus laboriosam? Voluptates.
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
