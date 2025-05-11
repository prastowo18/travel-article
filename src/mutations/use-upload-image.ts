import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/services/api';
import type { UploadImage } from '@/type';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (data: UploadImage) => uploadImage(data),

    onSuccess: () => {
      toast.success('Image uploaded successfully!');
    },

    onError: (error: Error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });
};
