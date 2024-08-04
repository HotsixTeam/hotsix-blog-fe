import React from 'react';
import styled from 'styled-components';

const EditSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoDisplay = styled.div`
  width: 302px;
  height: 30px;
  font-family: 'MangoDdobak';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #555555;
`;

const EditButton = styled.button`
  box-sizing: border-box;
  width: 50px;
  height: 30px;
  background: #001354;
  border: 1px solid #ffffff;
  border-radius: 5px;
  font-family: 'MangoBold';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #ffffff;
  margin-left: 45px;
`;

type DisplayFieldProps = {
  value: string | undefined;
  onEdit: () => void;
};

const DisplayField: React.FC<DisplayFieldProps> = ({ value, onEdit }) => {
  return (
    <EditSection>
      <InfoDisplay>{value}</InfoDisplay>
      <EditButton onClick={onEdit}>수정</EditButton>
    </EditSection>
  );
};

export default DisplayField;
