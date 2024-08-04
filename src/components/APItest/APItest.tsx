import axios from 'axios';
import { login } from '../../api/auth';

const APItest = () => {
  const handleLogin = async () => {
    try {
      const response = await axios.post<{ message: string; userId: number }>(
        '/api/users/login',
        {
          userId: 'jeongp616@naver.com',
          password: 'password3',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
    } catch (error: any) {
      if (error.response) {
        console.error('로그인 실패:', error.response.data);
      } else {
        console.error('네트워크 오류:', error.message);
      }
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>로그인 버튼</button>
    </div>
  );
};

export default APItest;
