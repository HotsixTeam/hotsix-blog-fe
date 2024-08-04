import { TiHeartOutline } from 'react-icons/ti';
import { useGetComments } from '../../queries/useGetComments';
import { CommentOutlined } from '@ant-design/icons';

interface PostProps {
  title: string;
  content: string;
  thumbSrc?: string;
  likeCount?: number;
  showStatus?: boolean;
  id?: number;
}

const Post = ({
  title,
  content,
  thumbSrc,
  likeCount,
  showStatus,
  id,
}: PostProps) => {
  // const { data: comments } = useGetComments(Number(id));

  return (
    <div className="w-postWidth h-postHeight border-solid border-2 border-gray rounded-2xl flex flex-row px-8 pt-2 pb-3 space-x-12">
      <div className="w-postInnerWidth mt-0">
        <div className="flex flex-row items-center justify-between">
          <p className="text-regular font-MangoBold mb-2 text-ellipsis overflow-hidden line-clamp-1">
            {title}
          </p>
          <div className="flex flex-col mt-0 gap-0">
            <div className="flex flex-row my-0">
              <TiHeartOutline className="w-6 h-6 text-xl" />
              <p className="text-small ml-1"> {likeCount}</p>
            </div>
            {/* <div className="flex flex-row">
              <CommentOutlined className="w-6 h-6 text-xl" />
              <p className="text-small ml-1">
                {comments ? comments.length : 0}
              </p>
            </div> */}
            {showStatus ? (
              <div></div>
            ) : (
              <div className="rounded-md font-bold text-xs p-1  text-white bg-darkblue">
                비공개
              </div>
            )}
          </div>
        </div>
        <p className="text-small font-MangoRegular text-ellipsis overflow-hidden line-clamp-3">
          {content}
        </p>
      </div>
      {thumbSrc ? (
        <img
          src={thumbSrc}
          alt="썸네일 이미지(있으면 보여주기)"
          className="w-32 h-32 rounded-md"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Post;
