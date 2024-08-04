import React from "react";

interface LoginInputProps {
    type: string;
    id: string;
    placeholder: string;
};

const LoginInput: React.FC<LoginInputProps> = ({ type, id, placeholder }) => {
    return (
      <input
        type= {type}
        id = {id}
        name = {id}
        placeholder={placeholder}
        className="block w-72 px-12 py-1.5 border-b-2 border-darkblue focus: outline-none text-xs"
      />  
    );
};

export default LoginInput;
