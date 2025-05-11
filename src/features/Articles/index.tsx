import _ from 'lodash';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { ArticleSkeletonLoading } from '../LandingPage/components/latest-article/skeleton';
import { ArticleItem } from '../LandingPage/components/latest-article/item';
import { useArticle, useCategories } from '@/services/queries';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const Articles = () => {
  const [page, setPage] = useState(1);

  const [inputTitle, setInputTitle] = useState('');
  const [inputCategory, setInputCategory] = useState('');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const pageSize = 8;

  const articleQuery = useArticle({
    title,
    category,
    page: String(page),
    pageSize: String(pageSize),
  });
  const { data, isLoading } = articleQuery;

  const categoriesQuery = useCategories({});
  const { data: categoriesData, isLoading: isLoadingCategories } =
    categoriesQuery;

  const sortData = () => {
    return data ? _.orderBy(data.data, ['createdAt'], ['desc']) : [];
  };

  const currentPage = data?.meta?.pagination?.page || 1;
  const pageCount = data?.meta?.pagination?.pageCount || 1;

  return (
    <div className="pt-5">
      <div className="px-5 lg:px-7">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Articles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="pt-10 pb-20 sm:pb-40">
          <div className="relative">
            <div
              className="w-full h-[400px] rounded-xl"
              style={{
                backgroundImage: "url('/hero-img2.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute left-0 right-0 flex items-center justify-center -bottom-16">
              <div className="hidden w-2/3 gap-10 p-10 bg-white sm:flex sm:flex-row sm:w-3/4 lg:w-2/3 rounded-2xl">
                <div className="flex flex-col w-full space-y-3">
                  <Label>Title Article</Label>
                  <Input
                    placeholder="Title article"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full space-y-3">
                  <Label>Category</Label>
                  {isLoadingCategories ? (
                    <Skeleton className="h-10" />
                  ) : categoriesData && categoriesData.data.length > 0 ? (
                    <Select
                      value={inputCategory}
                      onValueChange={(val) => setInputCategory(val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select story category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categoriesData.data.map((e) => (
                          <SelectItem key={e.id} value={e.name!}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="No categories found" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-4 py-2 text-sm text-muted-foreground">
                          No categories found
                        </div>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="self-end">
                  <Button
                    size="icon"
                    className="rounded-full bg-primary_2"
                    onClick={() => {
                      setTitle(inputTitle);
                      setCategory(inputCategory === 'all' ? '' : inputCategory);
                      setPage(1);
                    }}
                  >
                    <Search className="size-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-20 pb-32 bg-white">
        <div className="px-5 lg:px-7">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              Array.from({ length: pageSize }, (_, index) => (
                <ArticleSkeletonLoading key={index} />
              ))
            ) : (
              <>
                {sortData().map((e, i) => (
                  <ArticleItem key={i} data={e} />
                ))}
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon />
            </Button>
            <span className="text-sm font-medium">
              Page {isLoading ? 0 : currentPage} of {isLoading ? 0 : pageCount}
            </span>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
