import React from 'react';
import ValidateButton from './ValidateButton';

interface InputFieldProps {
  title: string;
  buttontext?: string;
  showbutton: boolean;
  type?: string;
  onclick?: () => void;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sort?: string;
}

const EmailInputField: React.FC<InputFieldProps> = ({
  title,
  onclick,
  buttontext,
  showbutton,
  type,
  sort,
  onchange,
}) => {
  return (
    <div className="mb-1">
      <div className="flex justify-between">
        <div className="text-sm">{title}</div>
      </div>
      <div className="flex w-80 h-10 border-darkblue rounded-lg  border-2 text-sm ">
        <input
          className={`inline-block w-72 h-90 border-white rounded-lg px-4 text-sm outline-none  `}
          type={type}
          onChange={onchange}
        ></input>
        <div className="flex items-center">
          <ValidateButton
            text={buttontext}
            onclick={onclick}
            showbutton={showbutton}
            sort={sort}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailInputField;
