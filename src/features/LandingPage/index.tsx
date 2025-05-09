import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, MessageCircle, Plane } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useAuthStore } from '@/stores/auth-store';
import { LatestArticle } from '@/contants';
import { Badge } from '@/components/ui/badge';

const LandingPage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="">
      {/* HERO */}
      <div className="px-5 lg:px-7">
        <div className="flex flex-col pt-10 lg:items-center lg:flex-row sm:pt-20">
          <div className="font-albertSans">
            <h1 className="font-light tracking-tight text-7xl lg:text-8xl">
              Your Adventures{' '}
              <span className="block lg:mt-2">Deserve an Audience</span>
            </h1>
          </div>
          <div className="flex-1 mt-5 lg:mt-0">
            <div className="font-light lg:w-3/4 float-end font-albertSans">
              <p className="">
                Every journey leaves more than just footprints — it leaves
                behind stories, emotions, and unforgettable moments. TrailScript
                is where your adventures come to life, turning memories into
                meaningful stories to share with a world full of explorers.{' '}
                <span>{!isAuthenticated && 'New here?'}</span>
              </p>

              {isAuthenticated ? (
                <Button className="px-6 mt-5 font-light tracking-wide text-white rounded-full bg-primary_2">
                  Begin Your Story
                </Button>
              ) : (
                <Button variant="link" className="p-0 italic" asChild>
                  <Link to="/register">Join the adventure — Register Now!</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="py-20">
          <div
            className="w-full h-[400px] rounded-xl"
            style={{
              backgroundImage: "url('/hero-img2.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </div>
      <div className="pt-20 pb-20 bg-white lg:pt-32">
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
                Discover the newest travel articles written by explorers around
                the world, capturing real moments, reflections, and journeys
                worth sharing.
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

          <div className="pt-32">
            <div className="grid grid-cols-1 gap-20 sm:gap-10 lg:gap-32 sm:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col-reverse py-8 rounded-lg lg:flex-row lg:justify-between lg:gap-10 px-7 bg-background_2">
                  <div className="mt-5 sm:mt-0">
                    <h3 className="text-2xl font-extralight font-albertSans">
                      Every Step of the Way
                    </h3>
                    <p className="mt-3 text-sm font-extralight font-albertSans">
                      Your travels are more than places visited — they're
                      moments felt, lessons learned, and stories worth telling.
                      This is where every step you've taken is remembered,
                      written, and shared with a world that loves to explore
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
      </div>
    </div>
  );
};

export default LandingPage;
