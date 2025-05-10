import { useQuery } from '@tanstack/react-query';

import { getArticles, getCategoriesService } from './api';

import type { ArticleParams, ArticleType, CategoriesType } from '@/type';

export function useArticle(params: ArticleParams) {
  return useQuery<ArticleType[]>({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
  });
}

export function useCategories() {
  return useQuery<CategoriesType[]>({
    queryKey: ['categories'],
    queryFn: () => getCategoriesService(),
  });
}
