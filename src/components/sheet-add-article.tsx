import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutationArticle } from '@/mutations/use-article';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import useArticleStore from '@/stores/article-store';

import { articleSchema, type ArticleValues } from '@/schemas';

import { useCategories } from '@/services/queries';

interface Props {
  action: 'add' | 'update';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SheetAddArticle = ({ action, onOpenChange, open }: Props) => {
  const { article, clearArticle } = useArticleStore();
  const categoriesQuery = useCategories();
  const { data: categoriesData, isLoading: isLoadingCategories } =
    categoriesQuery;

  const { mutate, isPending } = useMutationArticle(
    action,
    article?.document_id
  );

  const form = useForm<ArticleValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      cover_image_url:
        'https://res.cloudinary.com/yeremia-alfa-dio/image/upload/v1746858961/coast_9549731_1280_e6daefa4a5.png',
    },
  });
  const { handleSubmit, setValue, reset } = form;

  const onSubmit: SubmitHandler<ArticleValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
        clearArticle();
        reset({
          title: '',
          description: '',
          category: '',
          cover_image_url: '',
        });
      },
    });
  };

  useEffect(() => {
    if (action === 'update' && article !== null) {
      setValue('title', article.title);
      setValue('description', article.description);
      setValue('category', article.category);
      setValue('cover_image_url', article.cover_image_url);
    }
  }, [action, article, setValue]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-2xl font-medium tracking-tight font-albertSans">
            My Story
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col h-full overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 p-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Input story title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Input story description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      {isLoadingCategories ? (
                        <p>Loading categories...</p>
                      ) : categoriesData && categoriesData.length > 0 ? (
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={
                            field.value ? field.value.toString() : ''
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select story category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriesData.map((e) => (
                              <SelectItem key={e.id} value={e.id.toString()}>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending} type="submit" size="lg" className="">
                {action === 'update' ? 'Edit' : 'Save'} Story
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
