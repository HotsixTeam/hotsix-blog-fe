import { useState } from 'react';
import { usePostStore } from '../../store';
type PrivateToggle = 'private' | 'default' | 'public';

const PrivateButton = () => {
  const { postData, setPostData } = usePostStore();
  const [isPrivate, setIsPrivate] = useState<PrivateToggle>('default');
  const handlePrivateButton = (value: PrivateToggle) => {
    setIsPrivate(value);
    setPostData({
      ...postData,
      showStatus: value === 'private' ? false : true,
    });
  };

  return isPrivate === 'private' ? (
    <div className=" ml-3 flex flex-row">
      <button
        className="w-[6vw] h-6  border-gray text-gray border-r-white border-2 mb-2 rounded-sm font-thin font-MangoRegular text-sm"
        onClick={() => handlePrivateButton('public')}
      >
        전체 공개
      </button>
      <button
        className="w-[6vw] h-6  border-darkblue border-l-darkblue border-2 mb-2 rounded-sm font-MangoRegular text-darkblue text-sm"
        onClick={() => handlePrivateButton('private')}
      >
        비공개
      </button>
    </div>
  ) : isPrivate === 'default' ? (
    <div className=" ml-3 flex flex-row">
      <button
        className="w-[6vw] h-6  border-gray border-2 mb-2 rounded-sm font-thin text-gray font-MangoRegular text-sm"
        onClick={() => handlePrivateButton('public')}
      >
        전체 공개
      </button>
      <button
        className="w-[6vw] h-6  border-gray border-l-gray border-2 border-l-[1px] mb-2 rounded-sm font-thin text-sm text-gray font-MangoRegular"
        onClick={() => handlePrivateButton('private')}
      >
        비공개
      </button>
    </div>
  ) : (
    <div className=" ml-3 flex flex-row">
      <button
        className="w-[6vw] h-6  border-darkblue border-2 mb-2 rounded-sm font-MangoRegular text-sm text-darkblue"
        onClick={() => handlePrivateButton('public')}
      >
        전체 공개
      </button>
      <button
        className="w-[6vw] h-6  border-gray border-l-white border-2 mb-2 rounded-sm font-thin text-sm text-gray font-MangoRegular"
        onClick={() => handlePrivateButton('private')}
      >
        비공개
      </button>
    </div>
  );
};
export default PrivateButton;
