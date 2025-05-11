import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addCommentsService, updateCommentsService } from '@/services/api';
import type { CommentsValues } from '@/schemas';

export const useMutationComments = (
  article_id: string,
  action: 'add' | 'update',
  document_id?: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommentsValues) => {
      return action === 'add'
        ? addCommentsService(data, article_id)
        : updateCommentsService(data, document_id!, article_id);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comments', 'articles'],
      });
      toast.success(
        `Comment ${action === 'add' ? 'added' : 'updated'} successfully!`
      );
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
