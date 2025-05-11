import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCategoriesService } from '@/services/api';

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (document_id: string) => deleteCategoriesService(document_id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categories deleted successfully!');
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
