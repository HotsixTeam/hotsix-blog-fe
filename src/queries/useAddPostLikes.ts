import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/commentAPI';
import { addPostLike } from '../api/postAPI';

export const useAddPostLikes = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addPostLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postLikes', postId] });
      queryClient.invalidateQueries({ queryKey: ['infinitePosts'] });
    },
  });
};
