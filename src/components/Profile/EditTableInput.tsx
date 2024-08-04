import React, { ChangeEvent, RefObject } from 'react';
import styled from 'styled-components';

const EditSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoInput = styled.input`
  box-sizing: border-box;
  width: 302px;
  height: 30px;
  font-size: 12px;
  font-family: 'MangoDdobak';
  background: #ffffff;
  border: 1px solid #555555;
  border-radius: 5px;
  line-height: 20px;
`;

const SaveButton = styled.button`
  box-sizing: border-box;
  width: 50px;
  height: 30px;
  background: #ffffff;
  border: 1px solid #001354;
  border-radius: 5px;
  margin-left: 45px;
  font-family: 'MangoBold';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #001354;
`;

type EditableInputFieldProps = {
  inputRef: RefObject<HTMLInputElement>;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  placeholder: string;
};

const EditableInputField: React.FC<EditableInputFieldProps> = ({
  inputRef,
  value,
  onChange,
  onSave,
  placeholder,
}) => {
  return (
    <EditSection>
      <InfoInput
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <SaveButton onClick={onSave}>저장</SaveButton>
    </EditSection>
  );
};

export default EditableInputField;
