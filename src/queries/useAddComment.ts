import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/commentAPI';

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
