import { useQuery } from '@tanstack/react-query';

import { getArticles } from './api';

import type { ArticleParams, ArticleType } from '@/type';

export function useArticle(params: ArticleParams) {
  return useQuery<ArticleType[]>({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
  });
}
