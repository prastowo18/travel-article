import type {
  ArticleValues,
  CategoriesValues,
  CommentsValues,
} from '@/schemas';
import { request } from './utils';

import type {
  ArticleParams,
  CategoriesParams,
  CommentsParams,
  LoginUser,
  RegisterUser,
} from '@/type';

// AUTH
export const loginUserService = (data: LoginUser) =>
  request({
    url: '/api/auth/local',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

export const registerUserService = (data: RegisterUser) =>
  request({
    url: '/api/auth/local/register',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

// ARTICLES
export const getArticles = (params: ArticleParams) =>
  request({
    url: `/api/articles`,
    method: 'GET',
    params: {
      populate: '*',
      'filters[category][name][$eqi]': params.category,
      'filters[title][$eqi]': params.title,
      'pagination[page]': params.page,
      'pagination[pageSize]': params.pageSize,
    },
  });

export const addArticleService = (values: ArticleValues) =>
  request({
    url: `/api/articles`,
    method: 'POST',
    data: {
      data: { ...values, category: Number(values.category) },
    },
  });

export const updateArticleService = (
  values: ArticleValues,
  document_id: string
) =>
  request({
    url: `/api/articles/${document_id}`,
    method: 'PUT',
    data: {
      data: { ...values, category: Number(values.category) },
    },
  });

// export const uploadImage = (data: IPayloadBooks) =>
// request({
//   url: `/api/upload`,
//   method: 'POST',
//   data,
//   headers: { 'Content-Type': 'multipart/form-data' },
// });

export const deleteArticleService = (document_id: string) =>
  request({
    url: `/api/articles/${document_id}`,
    method: 'DELETE',
  });

// CATEGORIES
export const getCategoriesService = (params: CategoriesParams) =>
  request({
    url: `/api/categories`,
    method: 'GET',
    params: {
      'pagination[page]': params.page,
      'pagination[pageSize]': params.pageSize,
    },
  });

export const addCategoriesService = (values: CategoriesValues) =>
  request({
    url: `/api/categories`,
    method: 'POST',
    data: {
      data: values,
    },
  });

export const updateCategoriesService = (
  values: CategoriesValues,
  document_id: string
) =>
  request({
    url: `/api/categories/${document_id}`,
    method: 'PUT',
    data: {
      data: values,
    },
  });

export const deleteCategoriesService = (document_id: string) =>
  request({
    url: `/api/categories/${document_id}`,
    method: 'DELETE',
  });

// COMMENTS
export const getCommentsService = (params: CommentsParams) =>
  request({
    url: `/api/comments`,
    method: 'GET',
    params: {
      'populate[user]': '*',
      'pagination[page]': params.page,
      'pagination[pageSize]': params.pageSize,
    },
  });

export const addCommentsService = (values: CommentsValues) =>
  request({
    url: `/api/comments`,
    method: 'POST',
    data: {
      data: {
        ...values,
        article: Number(values.article),
      },
    },
  });

export const updateCommentsService = (
  values: CommentsValues,
  document_id: string
) =>
  request({
    url: `/api/comments/${document_id}`,
    method: 'PUT',
    data: {
      ...values,
      article: Number(values.article),
    },
  });

export const deleteCommentsService = (document_id: string) =>
  request({
    url: `/api/comments/${document_id}`,
    method: 'DELETE',
  });
