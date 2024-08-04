export interface PostData {
  thumb?: string;
  title?: string;
  description?: string;
  content: string;
  showStatus?: boolean | undefined;
  createdAt?: string;
  updatedAt?: string;
  author?: string;
  id?: number;
  likeCount?: number;
}
export interface PostsState {
  postDetail: PostData;
  setPosts: (postDEtail: PostData) => void;
}
export interface GetPostData {
  userId: number | undefined;
  pageParam?: number;
}
