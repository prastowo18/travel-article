import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addCategoriesService, updateCategoriesService } from '@/services/api';
import type { CategoriesValues } from '@/schemas';

export const useMutationCategories = (
  action: 'add' | 'update',
  document_id?: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoriesValues) => {
      return action === 'add'
        ? addCategoriesService(data)
        : updateCategoriesService(data, document_id!);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(
        `Categoires ${action === 'add' ? 'added' : 'updated'} successfully!`
      );
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
