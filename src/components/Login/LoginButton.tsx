import React from 'react';

interface LoginButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const LoginButton: React.FC<LoginButtonProps> = ({ text, onClick }) => {
  return (
    <button className="text-darkblue border-darkblue w-72 h-11 border-2 rounded-lg" onClick={onClick}>
      {text}
    </button>
  );
};

export default LoginButton;
