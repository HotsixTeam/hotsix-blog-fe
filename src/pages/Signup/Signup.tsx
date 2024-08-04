import React, { ChangeEvent, useCallback, useState } from 'react';
import InputField from '../../components/Signup/SignupInput';
import useInput from './../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { register, RegisterData } from '../../api/auth';
import EmailInputField from '../../components/ValidateEmail/EmailInputField';
import { ValidateEmail } from '../../types/ValidateEmail';
import axios from 'axios';
import { notify } from '../../components/Notice/Toast';
import Timer from '../../components/ValidateEmail/Timer';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [emailButton, setEmailButton] = useState<string>('normal');
  const [codeButton, setCodeButton] = useState<string>('normal');
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');

  const { mutate: signUp } = useMutation({
    mutationFn: register,
    onSuccess(data) {
      if (data) navigate('/login');
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

  const nameInput = useInput({
    initialValue: '',
    validationFn: (value: string) =>
      value.trim() === '' ? '필수항목입니다!' : undefined,
  });

  const passwordInput = useInput({
    initialValue: '',
    validationFn: (value: string) =>
      value.length < 8 ? '비밀번호는 최소 8자 이상이어야 합니다.' : undefined,
  });

  const confirmPasswordInput = useInput({
    initialValue: '',
    validationFn: (value: string) =>
      value !== passwordInput.value
        ? '비밀번호가 일치하지 않습니다.'
        : undefined,
  });

  const githubInput = useInput({
    initialValue: '',
    validationFn: () => undefined,
  });

  const introduceInput = useInput({
    initialValue: '',
    validationFn: () => undefined,
  });
  const handleEmailCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailCode(e.target.value);
  };
  const handleInputEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    emailInput.validate();
    nameInput.validate();
    passwordInput.validate();
    confirmPasswordInput.validate();

    if (
      !emailInput.value ||
      !nameInput.value ||
      !passwordInput.value ||
      !confirmPasswordInput.value ||
      emailInput.error ||
      nameInput.error ||
      passwordInput.error ||
      confirmPasswordInput.error
    ) {
      console.log('회원가입 에러');
      return;
    }
    signUp({
      userId: inputEmail,
      password: passwordInput.value,
      userName: nameInput.value,
      gitUrl: githubInput.value,
      introduce: introduceInput.value,
    });
  };
  const checkCode = useCallback(async (code: ValidateEmail) => {
    try {
      const response = await axios.post('/api/verifies/code', code);
      notify(response.data.message);
      setCodeButton('check');
      setShowTimer(false);
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
  }, []);
  const { mutate: checkCodeMutate } = useMutation({
    mutationFn: checkCode,
  });

  const requestEmail = useCallback(async (email: ValidateEmail) => {
    try {
      const response = await axios.post('/api/verifies/request', email);
      setShowCode(true);
      setEmailButton('sended');
      setShowTimer(true);
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
  }, []);
  const { mutate: requestMutate } = useMutation({
    mutationFn: requestEmail,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen my-4">
      <div className="text-darkblue text-center mb-2">
        <h1 className="text-3xl font-bold mb-4">회원가입</h1>
      </div>

      <div className="flex flex-col text-darkblue border-2 border-skyblue rounded-2xl p-10">
        <div className="flex">
          <EmailInputField
            title="이메일 입력 *"
            onclick={() => {
              requestMutate({ email: inputEmail });
            }}
            onchange={handleInputEmailChange}
            buttontext="이메일 인증"
            showbutton={true}
            type={'email'}
            sort={emailButton}
          />
          {showTimer && (
            <div className="absolute ml-[328px] mt-8">
              <Timer />
            </div>
          )}
        </div>
        {showCode && (
          <EmailInputField
            title="인증코드"
            onclick={() => {
              checkCodeMutate({ email: inputEmail, resetCode: emailCode });
            }}
            onchange={handleEmailCodeChange}
            buttontext="확인"
            showbutton={true}
            sort={codeButton}
          />
        )}

        <InputField
          title="비밀번호 *"
          type="password"
          value={passwordInput.value}
          onChange={(e) => {
            passwordInput.handleChange(e.target.value);
            if (submitted) passwordInput.validate();
          }}
          placeholder="비밀번호를 입력해주세요"
          error={submitted && passwordInput.error}
        />

        <InputField
          title="비밀번호 확인 *"
          type="password"
          value={confirmPasswordInput.value}
          onChange={(e) => {
            confirmPasswordInput.handleChange(e.target.value);
            if (submitted) confirmPasswordInput.validate();
          }}
          placeholder="비밀번호 확인"
          error={submitted && confirmPasswordInput.error}
        />

        <InputField
          title="이름(닉네임) *"
          type="text"
          value={nameInput.value}
          onChange={(e) => {
            nameInput.handleChange(e.target.value);
            if (submitted) nameInput.validate();
          }}
          placeholder="이름을 입력해주세요"
          error={submitted && nameInput.error}
        />

        <InputField
          title="Github (선택)"
          type="text"
          value={githubInput.value}
          onChange={(e) => githubInput.handleChange(e.target.value)}
          placeholder="Github URL을 입력해주세요"
        />

        <InputField
          title="Introduce (선택)"
          type="text"
          value={introduceInput.value}
          onChange={(e) => introduceInput.handleChange(e.target.value)}
          placeholder="한 줄 소개를 자유롭게 입력해주세요"
        />

        <div className="flex justify-center mt-5">
          <button
            className="text-darkblue border-darkblue w-full max-w-xs h-11 border-2 rounded-lg"
            onClick={() => {
              signUp({
                userId: inputEmail,
                password: passwordInput.value,
                userName: nameInput.value,
                gitUrl: githubInput.value,
                introduce: introduceInput.value,
              });
            }}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
