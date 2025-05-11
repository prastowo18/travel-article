import { useQuery } from '@tanstack/react-query';

import {
  getArticle,
  getArticles,
  getCategoriesService,
  getCommentsService,
} from './api';

import type {
  ArticleOneResponseType,
  ArticleParams,
  ArticleResponseType,
  CategoriesParams,
  CategoriesReponse,
  CommentResponseType,
  CommentsParams,
} from '@/type';

export function useArticle(params: ArticleParams) {
  return useQuery<ArticleResponseType>({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
  });
}

export function useOneArticle(document_id: string) {
  return useQuery<ArticleOneResponseType>({
    queryKey: ['article-one', document_id],
    queryFn: () => getArticle(document_id),
  });
}

export function useCategories(params: CategoriesParams) {
  return useQuery<CategoriesReponse>({
    queryKey: ['categories', params],
    queryFn: () => getCategoriesService(params),
  });
}

export function useComments(params: CommentsParams) {
  return useQuery<CommentResponseType>({
    queryKey: ['comments', params],
    queryFn: () => getCommentsService(params),
  });
}
