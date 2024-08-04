import { create } from 'zustand';
import { PostData } from './types/Post';

interface StoreType {
  postData: PostData;
  setPostData: (data: Partial<PostData>) => void;
}
interface LoginState {
  isLoggedIn: boolean;
  setIsLoggedIn: (data: boolean) => void;
}
export const usePostStore = create<StoreType>((set) => ({
  postData: {
    thumb: '',
    title: '',
    description: '',
    content: '',
    showStatus: undefined,
  },
  setPostData: (data: Partial<PostData>) =>
    set((state) => ({
      postData: {
        ...state.postData,
        ...data,
      },
    })),
}));
const getInitialState = (): boolean => {
  const savedState = sessionStorage.getItem('isLoggedIn');
  return savedState ? JSON.parse(savedState) : false; // 기본값 false
};

export const useLoginStateStore = create<LoginState>((set) => ({
  isLoggedIn: getInitialState(),
  setIsLoggedIn: (data: boolean) => {
    set({ isLoggedIn: data });
    sessionStorage.setItem('isLoggedIn', JSON.stringify(data));
  },
}));
