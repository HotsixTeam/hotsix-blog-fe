import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useGetPostLikes } from '../../../queries/useGetPostLikes';
import { useQuery } from '@tanstack/react-query';
import { UserData } from '../../../types/UserData';
import { fetchUserProfile } from '../../../api/userAPI';
import { useAddPostLikes } from '../../../queries/useAddPostLikes';
import { useSubPostLikes } from '../../../queries/useSubPostLikes';

const CommentHeader: React.FC<{
  commentCount: number;
  likeCount: number;
  userId: number;
  id: number;
}> = ({ commentCount, likeCount, userId, id }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleAddLikes = () => {
    addLikes();
    setIsLiked(true);
  };
  const handleSubLikes = () => {
    subLikes();
    setIsLiked(false);
  };
  const { mutate: addLikes } = useAddPostLikes(id);
  const { mutate: subLikes } = useSubPostLikes(id);
  const { data: postLikes } = useGetPostLikes(id);
  const { data: userProfile, error } = useQuery<UserData>({
    queryKey: ['getprofile'],
    queryFn: fetchUserProfile,
  });
  useEffect(
    () =>
      postLikes?.likedId.includes(userProfile?.id)
        ? setIsLiked(true)
        : setIsLiked(false),
    [postLikes, userProfile],
  );

  return (
    <div className=" w-[40vw] border-b-2 border-b-stone-200  font-black  text-lg ">
      <div>
        {isLiked ? (
          <HeartFilled
            onClick={handleSubLikes}
            className="text-3xl text-sky-200 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <HeartOutlined
            onClick={handleAddLikes}
            className="text-3xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
          />
        )}
      </div>
      <span> 좋아요 {postLikes?.likeCount}개</span>&nbsp;&nbsp;&nbsp;댓글
      <span className="font-black text-darkblue"> {commentCount}개</span>
    </div>
  );
};

export default CommentHeader;
