import { create } from 'zustand';
import { PostData } from '../types/Post';

interface PostsState {
  postDetail: PostData;
  setPostDetail: (posts: PostData) => void;
}
export const usePostDetailStore = create<PostsState>((set) => ({
  postDetail: { content: '' },
  setPostDetail: (postDetail) => set({ postDetail }),
}));
