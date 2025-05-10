import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addArticleService, updateArticleService } from '@/services/api';
import type { ArticleValues } from '@/schemas';

export const useMutationArticle = (
  action: 'add' | 'update',
  document_id?: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArticleValues) => {
      return action === 'add'
        ? addArticleService(data)
        : updateArticleService(data, document_id!);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success(
        `Article ${action === 'add' ? 'added' : 'updated'} successfully!`
      );
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
