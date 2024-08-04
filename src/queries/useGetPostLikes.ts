import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostDetail, getPostLikes } from '../api/postAPI';

export const useGetPostLikes = (postId: number) => {
  return useQuery({
    queryKey: ['postLikes', postId],
    queryFn: () => getPostLikes(postId),
  });
};
