import axios from 'axios';
import axiosInstance from './axiosInstance';
import { notify } from '../components/Notice/Toast';

export interface LoginData {
  userId: string;
  password: string;
}

export interface RegisterData {
  userId: string;
  password: string;
  userName: string;
  gitUrl?: string;
  introduce?: string;
}

export interface sideUserData {
  name: string;
  email: string;
  github?: string;
  introduce?: string;
}

export interface PostData {
  id: number;
  author: string;
  thumb: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  showStatus: boolean;
}

export interface FetchPostsResponse {
  posts: PostData[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}

export const login = async (data: LoginData) => {
  try {
    const response = await axios.post('/api/users/login', data);
    notify('로그인 되었습니다.');

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        notify(error.response.data.error);
      } else {
        notify(error.message);
      }
    }
  }
};

export const register = async (data: RegisterData) => {
  try {
    const response = await axios.post('/api/users', data);
    notify('회원가입 되었습니다.');

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        notify(error.response.data.error);
      } else {
        notify(error.message);
      }
    }
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('/api/users/logout');
    return true;
  } catch (error) {
    console.log('로그아웃 실패', error);
    return false;
  }
};

export const sideUser = async () => {
  const response = await axiosInstance.get('/api/users');
  return response.data;
};

export const fetchPosts = async (
  page: number,
  pageSize: number,
  totalItems: number,
  totalPages: number,
): Promise<FetchPostsResponse> => {
  const response = await axiosInstance.get(`/posts`);
  return {
    posts: response.data,
    pagination: {
      totalItems,
      currentPage: page,
      totalPages,
      pageSize,
    },
  };
};
