import React, { useEffect, useState } from 'react';
import '../../index.css';
import ButtonComponent from '../../components/Login/LoginButton';
import LoginInputForm from '../../components/Login/LoginInputForm';
import { useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login, LoginData } from '../../api/auth';
import useInput from '../../hooks/useInput';
import { notify } from '../../components/Notice/Toast';
import { useLoginStateStore } from '../../store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useLoginStateStore();
  useEffect(() => {
    const cookie = localStorage.getItem('auth-cookie');
    if (cookie) {
      console.log('자동 로그인');
      navigate('/');
    }
  }, [navigate]);

  const mutation: UseMutationResult<any, Error, LoginData> = useMutation<
    any,
    Error,
    LoginData
  >({
    mutationFn: login,
    onSuccess: (data) => {
      if (data) {
        setIsLoggedIn(true);
        navigate('/');
      } else {
        notify('회원 정보가 일치하지 않습니다.');
      }
    },
  });

  const emailInput = useInput({
    initialValue: '',
    validationFn: (value) => {
      if (!value.trim()) {
        return '이메일을 입력해주세요.';
      }
      if (!/\S+@\S+\.\S+/.test(value)) {
        return '올바른 이메일 형식을 입력해주세요.';
      }
      return undefined;
    },
  });

  const passwordInput = useInput({
    initialValue: '',
    validationFn: (value) => {
      if (value.length < 8) {
        return '비밀번호는 8자 이상이어야 합니다.';
      }
      return undefined;
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!emailInput.error && !passwordInput.error) {
      mutation.mutate({
        userId: emailInput.value,
        password: passwordInput.value,
      });
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };
  const handleValidateEmail = () => {
    navigate('/passwordedit');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen my-4">
      <div className="text-darkblue text-center mb-4">
        <h1 className="text-3xl bold mb-6">Login</h1>
        <h1 className="text-lg">안녕하세요!</h1>
        <h1 className="text-lg">
          블로그 이용을 위해 로그인/회원가입을 해주세요 :)
        </h1>
      </div>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 border-2 border-skyblue rounded-3xl p-10"
      >
        <div className="flex flex-col gap-5">
          <LoginInputForm
            type="text"
            id="ID"
            placeholder="아이디를 입력해주세요"
            value={emailInput.value}
            onChange={(e) => {
              emailInput.handleChange(e.target.value);
              if (submitted) emailInput.validate();
            }}
          />
          {submitted && emailInput.error && (
            <p className="text-red-500">{emailInput.error}</p>
          )}
          <LoginInputForm
            type="password"
            id="PW"
            placeholder="비밀번호를 입력해주세요"
            value={passwordInput.value}
            onChange={(e) => {
              passwordInput.handleChange(e.target.value);
              if (submitted) passwordInput.validate();
            }}
          />
          {submitted && passwordInput.error && (
            <p className="text-red-500">{passwordInput.error}</p>
          )}
          <div className="mt-3">
            <ButtonComponent text="로그인" onClick={handleLogin} />
          </div>
        </div>

        <div className="text-center my-2">
          <h1 className="text-sm mb-1">계정이 없으시다면?</h1>
          <ButtonComponent text="회원가입" onClick={handleSignup} />
        </div>
        <h1 className="text-sm text-center">비밀번호를 잊으셨나요?</h1>
        <ButtonComponent text="비밀번호 변경" onClick={handleValidateEmail} />
      </form>
    </div>
  );
};

export default Login;
