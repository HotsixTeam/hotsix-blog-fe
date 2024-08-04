import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { CommentData } from '../../../types/Comment';
import defaultProfile from '../../../assets/images/defaultProfile.png';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useDeleteComment } from '../../../queries/useDeleteComment';
import EditComment from './EditComment';
import { useAddComment } from '../../../queries/useAddComment';
import { usePostDetailStore } from '../../../stores/postsStore';
import { useEditComment } from '../../../queries/useEditComment';
import { fetchUserProfile } from '../../../api/userAPI';
import { useQuery } from '@tanstack/react-query';
import { UserData } from '../../../types/UserData';
import { useNavigate } from 'react-router-dom';

const Comment: React.FC<{
  comment: CommentData;
}> = ({ comment }) => {
  const { data: userData, error } = useQuery<UserData>({
    queryKey: ['getprofile'],
    queryFn: fetchUserProfile,
  });
  const { mutate: editCommentMutate } = useEditComment();
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const handleDeleteComment = () => {
    const confirmed = window.confirm('정말로 댓글을 삭제 하겠습니까?');
    if (confirmed) {
      deleteCommentMutate(comment.id);
    }
  };
  const [newComment, setNewComment] = useState<string>('');
  const { postDetail } = usePostDetailStore();
  const { mutate: addCommentMutate } = useAddComment();
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };
  const navigate = useNavigate();
  const [commentToggle, setCommentToggle] = useState<boolean>(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setNewComment(comment.content);
  }, []);
  return commentToggle ? (
    <div className="flex justify-between w-[38vw]  border-y-[2px] border-y-stone-200 py-8">
      <div className="flex  ">
        <img
          className="w-[55px] h-[55px] rounded-full border-[1px] "
          src={comment.profileImg || defaultProfile}
        />
        <div className="flex flex-col ml-3 ">
          <div
            className="text-lg font-black "
            onClick={() => navigate(`/myblog/${comment.userId}`)}
          >
            {comment.userName}
          </div>
        </div>
      </div>

      <div className="w-[20vw] h-20 text-base overflow-hidden break-words border-2 border-skyblue">
        <textarea
          ref={commentRef}
          value={newComment}
          onChange={handleCommentChange}
          className="w-full h-full resize-none border border-skyblue p-2 overflow-hidden whitespace-pre-wra focus:outline-none "
          placeholder="댓글을 입력하세요..."
        ></textarea>
      </div>
      <div className="flex flex-col">
        <div
          onClick={() => {
            editCommentMutate({ commentId: comment.id, content: newComment });
            setCommentToggle(false);
          }}
          className="flex items-cent
          er  text-base font-light cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:font-black hover:text-black"
        >
          <PlusCircleOutlined className="text-3xl my-1" />
          등록
        </div>
        <div
          onClick={() => {
            setCommentToggle(false);
          }}
          className="flex items-center  text-base font-light cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:font-black hover:text-black"
        >
          <CloseCircleOutlined className="text-3xl my-1 " />
          취소
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-between w-[38vw] my-4 ">
      <div className="flex ">
        <img
          className="w-[55px] h-[55px] rounded-full border-[1px]  "
          src={comment.profileImg || defaultProfile}
        />
        <div className="flex flex-col ml-3">
          <div
            className="text-lg font-medium hover:font-black cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:text-black"
            onClick={() => navigate(`/myblog/${comment.userId}`)}
          >
            {comment.userName}
          </div>
          <div className="text-xs">{comment.updatedAt.slice(0, 10)}</div>
        </div>
      </div>

      <div className="w-[20vw] h-20  text-base overflow-auto break-words">
        {comment.content}
      </div>
      {comment.userName == userData?.userName ? (
        <div className="flex flex-col text-sm ">
          <div
            onClick={() => setCommentToggle(true)}
            className="text-sm font-medium hover:font-black cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:text-black"
          >
            <FormOutlined className="text-2xl " />
            수정
          </div>
          <div
            onClick={handleDeleteComment}
            className=" text-sm font-medium hover:font-black cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:text-black"
          >
            <DeleteOutlined className="text-2xl " />
            삭제
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comment;
