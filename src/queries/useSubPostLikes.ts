import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/commentAPI';
import { addPostLike, subPostLike } from '../api/postAPI';

export const useSubPostLikes = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => subPostLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postLikes', postId] });
      queryClient.invalidateQueries({ queryKey: ['infinitePosts'] });
    },
  });
};
