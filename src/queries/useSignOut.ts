import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signout } from '../api/userAPI';

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['infinitePosts'] });
    },
  });
};
