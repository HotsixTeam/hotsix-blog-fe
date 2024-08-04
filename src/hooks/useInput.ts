import { useState } from 'react';

interface UseInputProps {
  initialValue: string;
  validationFn: (value: string) => string | undefined;
}

const useInput = ({ initialValue, validationFn }: UseInputProps) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = (newValue: string) => {
    setValue(newValue);

    if (newValue.trim() === '') {
      setError('필수항목입니다!');
    } else {
      setError(validationFn(newValue));
    }
  };

  const validate = () => {
    if (value.trim() === '') {
      setError('필수항목입니다!');
    } else {
      setError(validationFn(value));
    }
  };

  return {
    value,
    error,
    handleChange,
    validate,
  };
};

export default useInput;
