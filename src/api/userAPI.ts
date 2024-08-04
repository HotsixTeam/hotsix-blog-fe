import axios from 'axios';
import { NewUserData, UserData } from '../types/UserData';
import { notify } from '../components/Notice/Toast';
import { ValidateEmail } from '../types/ValidateEmail';
import axiosInstance from './axiosInstance';

export const fetchUserProfile = async (): Promise<UserData> => {
  const response = await axios.get<UserData>('/api/users');
  return response.data;
};
export const getUserProfile = async (userId: string | undefined) => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
};
export const updateUserProfile = async (profile: NewUserData) => {
  const response = await axios.patch('/api/users', profile); // Adjust the URL based on your API

  return response.data;
};
export const updateUserName = async (username: NewUserData) => {
  try {
    const response = await axios.patch('/api/users/username', username); // Adjust the URL based on your API
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log(error.response.data);
        notify(error.response.data.error);
      } else {
        console.log(error.message);
      }
    }
  }
};
export const updateProfileImg = async (profileImg: NewUserData) => {
  try {
    const response = await axios.patch('/api/users', profileImg); // Adjust the URL based on your API
    notify('이미지 수정 중');
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
export const resetPassword = async (emailPassword: ValidateEmail) => {
  try {
    const response = await axios.patch('/api/verifies/reset', emailPassword); // Adjust the URL based on your API
    notify(response.data.message);
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
export const logOut = async () => {
  try {
    const response = await axios.post('/api/users/logout'); // Adjust the URL based on your API
    console.log(response);
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
export const signout = async () => {
  try {
    const response = await axios.delete('/api/users');
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

// export const requestEmail = async (email: Email) => {
//   try {
//     const response = await axios.post('/api/verifies/request', email); // Adjust the URL based on your API
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         notify(error.response.data.error);
//       } else {
//         notify(error.message);
//       }
//     }
//   }
// };
