import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { useMutationCategories } from '@/mutations/categories/use-categories';

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

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { categoriesSchema, type CategoriesValues } from '@/schemas';

interface Props {
  name: string | null;
  document_id: string;
  action: 'add' | 'update';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SheetCategories = ({
  name,
  document_id,
  action,
  onOpenChange,
  open,
}: Props) => {
  const { mutate, isPending } = useMutationCategories(action, document_id);

  const form = useForm<CategoriesValues>({
    resolver: zodResolver(categoriesSchema),
    defaultValues: {
      name: '',
    },
  });
  const { handleSubmit, setValue, reset } = form;

  const onSubmit: SubmitHandler<CategoriesValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
        reset({
          name: '',
        });
      },
    });
  };

  useEffect(() => {
    if (action === 'update' && name !== null) {
      setValue('name', name);
    }
  }, [action, name, setValue]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-2xl font-medium tracking-tight font-albertSans">
            Section Categories
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Input category name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending} type="submit" size="lg" className="">
                {action === 'update' ? 'Edit' : 'Save'} Categories
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
