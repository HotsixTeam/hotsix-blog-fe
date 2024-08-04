
import React, { ChangeEvent } from "react";

interface LoginInputFormProps {
    type: string;
    id: string;
    placeholder: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginInputForm: React.FC<LoginInputFormProps> = ({ type, id, placeholder, value, onChange }) => {

    return(
        <div className="relative">
            <label 
                htmlFor={id}
                className="absolute top-0.5 text-darkblue text-xl">   
                {id}
            </label>
            <input
                type= {type}
                id = {id}
                name = {id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="block w-72 px-12 py-1.5 border-b-2 border-darkblue focus: outline-none text-xs"
            />
        </div>
    );
};

export default LoginInputForm;
