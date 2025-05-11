import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCommentsService } from '@/services/api';

export const useDeleteComments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (document_id: string) => deleteCommentsService(document_id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comments', 'articles'],
      });
      toast.success('Comments deleted successfully!');
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
