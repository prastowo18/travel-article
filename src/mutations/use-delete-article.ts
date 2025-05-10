import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteArticleService } from '@/services/api';

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (document_id: string) => deleteArticleService(document_id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success('Article deleted successfully!');
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
