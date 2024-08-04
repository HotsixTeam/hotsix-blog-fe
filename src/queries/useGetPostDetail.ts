import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostDetail } from '../api/postAPI';

export const useGetPostDetail = (postId: number) => {
  return useQuery({
    queryKey: ['postdetail', postId],
    queryFn: () => getPostDetail(postId),
  });
};
