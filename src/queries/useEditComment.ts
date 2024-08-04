import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, editComment } from '../api/commentAPI';

export const useEditComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
