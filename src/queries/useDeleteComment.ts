import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/commentAPI';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
