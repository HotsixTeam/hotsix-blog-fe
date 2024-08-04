import React, { ChangeEvent, useRef, useState } from 'react';
import defaultProfile from '../../../assets/images/defaultProfile.png';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAddComment } from '../../../queries/useAddComment';
import { usePostDetailStore } from '../../../stores/postsStore';
import { useQuery } from '@tanstack/react-query';
import { UserData } from '../../../types/UserData';
import { fetchUserProfile } from '../../../api/userAPI';

const AddComment = () => {
  const [comment, setComment] = useState<string>('');
  const { postDetail } = usePostDetailStore();
  const { mutate: addCommentMutate } = useAddComment();
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const { data: userData } = useQuery<UserData>({
    queryKey: ['getprofile'],
    queryFn: fetchUserProfile,
  });
  return (
    <div className="flex justify-between w-[38vw]  border-t-[0px] border-t-stone-200 py-4">
      <div className="flex ">
        <img
          className="w-[55px] h-[55px] rounded-full border-[1px] "
          src={userData?.profileImg || defaultProfile}
        />
        <div className="flex flex-col ml-3">
          <div className="text-lg font-medium">{userData?.userName}</div>
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
      <div
        onClick={() => {
          addCommentMutate({ content: comment, postId: postDetail.id });
          setComment('');
        }}
        className="flex items-center justify-center font-medium hover:font-black cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:text-black"
      >
        <PlusCircleOutlined className="text-3xl " />
        등록
      </div>
    </div>
  );
};

export default AddComment;
