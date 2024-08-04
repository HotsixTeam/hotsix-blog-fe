import React, { ChangeEvent, useRef, useState } from 'react';
import defaultProfile from '../../../assets/images/defaultProfile.png';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useAddComment } from '../../../queries/useAddComment';
import { usePostDetailStore } from '../../../stores/postsStore';

const EditComment = () => {
  const [comment, setComment] = useState<string>('');
  const { postDetail } = usePostDetailStore();
  const { mutate: addCommentMutate } = useAddComment();
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex justify-between w-[38vw] my-4 border-t-[2px] border-y-stone-200 pt-8">
      <div className="flex ">
        <img
          className="w-[55px] h-[55px] rounded-full border-[1px] "
          src={defaultProfile}
        />
        <div className="flex flex-col ml-3">
          <div className="text-lg font-black">박정준</div>
        </div>
      </div>

      <div className="w-[20vw] h-20 text-base overflow-hidden break-words border-2 border-skyblue">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className="w-full h-full resize-none border border-skyblue p-2 overflow-hidden whitespace-pre-wra focus:outline-none "
          placeholder="댓글을 입력하세요..."
        ></textarea>
      </div>
      <div className="flex flex-col">
        <div
          onClick={() => {
            addCommentMutate({ content: comment, postId: postDetail.id });
            setComment('');
          }}
          className="flex items-center  text-base font-normal cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:text-sky-300"
        >
          <PlusCircleOutlined className="text-3xl my-1" />
          등록
        </div>
        <div
          onClick={() => {
            addCommentMutate({ postId: postDetail.id, content: comment });
            setComment('');
          }}
          className="flex items-center  text-base font-normal cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:text-sky-300"
        >
          <CloseCircleOutlined className="text-3xl my-1 " />
          취소
        </div>
      </div>
    </div>
  );
};

export default EditComment;
