import axios from 'axios';
import { PostData } from '../types/Post';
import { notify } from '../components/Notice/Toast';

export const getCommnents = async (postId: number) => {
  try {
    const response = await axios.get(`/api/comments/post/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.log(error.message);
      }
    }
  }
};

export const addComment = async (commentData: {
  content: string | undefined;
  postId: number | undefined;
}) => {
  try {
    const response = await axios.post(`/api/comments`, commentData);
    console.log(response.data);
    notify('댓글 작성 성공');
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
export const editComment = async (commentData: {
  commentId: number | undefined;
  content: string | undefined;
}) => {
  if (!commentData.content) {
    console.error('댓글 내용을 입력하세요.');
    return;
  }

  try {
    const response = await axios.patch(
      `/api/comments/${commentData.commentId}`,
      { content: commentData.content }, // JSON 객체로 전달
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error.message);
      }
    }
  }
};
export const deleteComment = async (commentId: number) => {
  try {
    const response = await axios.delete(`/api/comments/${commentId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    notify(response.data.message);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.log(error.message);
      }
    }
  }
};
