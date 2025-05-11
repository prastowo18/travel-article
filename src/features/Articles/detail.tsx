import { Link, useParams } from 'react-router-dom';

import { useOneArticle } from '@/services/queries';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Loading } from '@/components/loading';
import type { ArticleType } from '@/type';
import { formatDistance } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { commentsSchema, type CommentsValues } from '@/schemas';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutationComments } from '@/mutations/comments/use-comments';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteComments } from '@/mutations/comments/use-delete-comments';

const DetailArticle = () => {
  const [commentId, setCommentId] = useState('');
  const [action, setAction] = useState<'add' | 'update'>('add');

  const { document_id } = useParams();

  const queryClient = useQueryClient();
  const articleQuery = useOneArticle(document_id ?? '');
  const { data, isLoading, error } = articleQuery;

  const { mutate, isPending } = useMutationComments(
    String(data?.data.id),
    action,
    commentId
  );

  const { mutate: mutateDelete } = useDeleteComments();

  const form = useForm<CommentsValues>({
    resolver: zodResolver(commentsSchema),
    defaultValues: {
      content: '',
    },
  });
  const { handleSubmit, setValue, reset } = form;

  const onEdit = (content: string, comment_id: string) => {
    setCommentId(comment_id);
    setAction('update');
    setValue('content', content);
  };

  const onDelete = (value: string) => {
    mutateDelete(value, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['article-one', document_id],
        });
        setAction('add');
      },
    });
  };

  const onSubmit: SubmitHandler<CommentsValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['article-one', document_id],
        });

        if (action == 'update') {
          setAction('add');
        }

        reset({
          content: '',
        });
      },
      onError: () => {
        if (action == 'update') {
          setAction('add');
        } else {
          setAction('update');
        }

        reset({
          content: '',
        });
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.data) {
    return <div>Error loading article.</div>;
  }

  const {
    cover_image_url,
    title,
    createdAt,
    description,
    user: { username },
    comments,
  }: ArticleType = data.data;

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
              <BreadcrumbLink asChild>
                <Link to="/articles">Articles</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="pt-10 pb-32" />
      </div>
      <div className="px-5 pt-24 pb-32 bg-white sm:px-10 lg:px-56">
        <div className="flex flex-col gap-5 -mt-52">
          <div
            className="w-full h-[300px] lg:h-[400px] rounded-xl"
            style={{
              backgroundImage: `url('${cover_image_url}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="mt-3 font-albertSans">
            <h1 className="text-4xl font-light">{title}</h1>
            <p className="text-sm font-extralight">
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              }).replace('about', '')}
            </p>
            <p className="mt-3 text-sm">
              <span className="font-extralight">Created by:</span> {username}
            </p>
            <p className="mt-10 font-extralight">{description}</p>
          </div>
          <div className="mt-10 border-t">
            <p className="mt-2">Comments</p>
            <div className="">
              {comments?.map((e) => (
                <div
                  className="flex justify-between gap-5 pt-5 pb-1 border-b"
                  key={e.id}
                >
                  <div className="flex-1">
                    <p className="mb-3 font-medium capitalize">
                      {e.user.username}
                    </p>
                    <p className="font-light">{e.content}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-extralight">
                      {formatDistance(new Date(e.createdAt), new Date(), {
                        addSuffix: true,
                      }).replace('about', '')}
                    </p>
                    <div className="flex items-center justify-end gap-3 mt-5">
                      <button
                        className="text-sm hover:underline hover:underline-offset-4 text-secondary_2"
                        onClick={() => onEdit(e.content, String(e.id))}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm text-red-500 hover:underline hover:underline-offset-4"
                        onClick={() => onDelete(e.documentId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 mt-10"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Type your comment here."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-fit bg-primary_2">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailArticle;
