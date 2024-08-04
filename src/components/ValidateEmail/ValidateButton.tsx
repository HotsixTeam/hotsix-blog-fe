import cheack from '../../assets/images/cheack.png';
interface ValidateButtonProps {
  text?: string;
  showbutton: boolean;
  onclick?: () => void;
  sort?: string;
}

// 함수형 컴포넌트 정의
const ValidateButton: React.FC<ValidateButtonProps> = ({
  text,
  onclick,
  showbutton,
  sort,
}) => {
  return showbutton ? (
    sort === 'check' ? (
      <div>
        <img src={cheack} className="w-6 h-6" alt="" />
      </div>
    ) : sort === 'sended' ? (
      <div>
        <div className="box-border p-2 h-7 bg-gray-400 border-white font-sans text-xs text-white mx-1 whitespace-nowrap rounded">
          {text}
        </div>
      </div>
    ) : (
      <div>
        <button
          onClick={onclick}
          className="box-border p-2 h-7 bg-darkblue border-white font-sans text-xs text-white mx-1 whitespace-nowrap rounded hover:bg-blue-900"
        >
          {text}
        </button>
      </div>
    )
  ) : (
    <></>
  );
};

export default ValidateButton;
