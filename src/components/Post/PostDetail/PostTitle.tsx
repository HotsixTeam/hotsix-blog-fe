import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeletePost } from '../../../queries/useDeletePost';
import { useQuery } from '@tanstack/react-query';
import { UserData } from '../../../types/UserData';
import { fetchUserProfile } from '../../../api/userAPI';

const PostTitle: React.FC<{
  id: number | undefined;
  title: string | undefined;
  userId: number | undefined;
  author: string | undefined;
  updatedAt: string | undefined;
  showStatus: boolean | undefined;
  likeCount: number | undefined;
}> = ({ id, title, author, updatedAt, showStatus, userId }) => {
  const { mutate: deletePostMutate } = useDeletePost();
  const navigate = useNavigate();
  const handleDeletePost = () => {
    const confirmed = window.confirm('정말로 게시글을 삭제 하겠습니까?');
    if (confirmed) {
      deletePostMutate(Number(id));
      navigate('/home');
    }
  };
  const { data: userData, error } = useQuery<UserData>({
    queryKey: ['getprofile'],
    queryFn: fetchUserProfile,
  });
  const handleEditPost = () => {
    navigate(`/postedit/${id}`);
  };
  return (
    <div className="flex flex-col w-[40vw] border-b border-b-stone-200 pb-3 ">
      <div className="text-5xl font-black font-bold  from-neutral-950">
        {'  ' + title}
      </div>
      <div className="flex-row flex justify-between">
        <div className="flex-row flex">
          <button
            onClick={() => {
              navigate(`/myblog/${userId}`);
            }}
            className="text-black font-black font-thin cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:font-black hover:text-black"
          >
            {author}
          </button>
          <div className="font-light"> ㅤ {updatedAt?.slice(0, 10)}</div>
          {!showStatus ? (
            <div className="rounded-md font-bold text-xs p-1 ml-2 text-white bg-darkblue">
              비공개
            </div>
          ) : (
            <div>
              <div className="ml-[49px]"></div>
            </div>
          )}
        </div>
        {userData?.userName == author ? (
          <div className="flex-row flex">
            <div
              onClick={handleEditPost}
              className="ml-[10px] text-sm font-thin color-gray hover:font-bold"
            >
              수정
            </div>
            <div
              onClick={handleDeletePost}
              className="ml-[10px] text-sm font-thin color-gray hover:font-bold"
            >
              삭제
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PostTitle;
