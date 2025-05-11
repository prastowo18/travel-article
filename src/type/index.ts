/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType, ReactNode } from 'react';

interface GuardProps {
  children: ReactNode;
}

export interface IRoute {
  path: string;
  element: ComponentType;
  guard?: ComponentType<GuardProps>;
  layout?: ComponentType<GuardProps>;
}

export interface LoginUser {
  identifier: string;
  password: string;
}

export interface RegisterUser {
  email: string;
  username: string;
  password: string;
}

export interface ArticleParams {
  category?: string;
  title?: string;
  page?: string;
  pageSize?: string;
}

export interface CategoriesParams {
  page?: string;
  pageSize?: string;
}

export interface CommentsParams {
  page?: string;
  pageSize?: string;
}

export interface Category {
  id: number;
  documentId: string;
  name?: string;
  description?: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  content?: string;
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export interface MyArticleType {
  title: string;
  description: string;
  createdAt: Date;
}

export interface CategoriesType {
  id: number;
  documentId: string;
  name: string;
  description: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}
export interface ArticleResponseType {
  data: ArticleType[];
  meta: Meta;
}

export interface ArticleType {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  user: User;
  category: Category | null;
  comments: Category[];
  localizations: any[];
}

export interface Category {
  id: number;
  documentId: string;
  name?: string;
  description?: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  content?: string;
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface CategoriesReponse {
  data: Category[];
  meta: Meta;
}

export interface CommentResponseType {
  data: CommentType[];
  meta: Meta;
}

export interface CommentType {
  id: number;
  documentId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  user: User;
}
