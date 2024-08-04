import defaultThumb from '../../assets/images/defaultThumb.jpg';
import { ChangeEvent, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Editor from '../../components/Post/Eidtor';
import PrivateButton from '../../components/Post/PrivateButton';
import { uploadImageToFirebase } from '../../Firebase';
import { usePostStore } from '../../store';
import { extractTextFromHTML } from '../../utils/extractTextFromHtml';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editPost, registerPost } from '../../api/postAPI';
import { notify } from '../../components/Notice/Toast';
import { useNavigate, useParams } from 'react-router-dom';
import { PostData } from '../../types/Post';

const PostEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { postData, setPostData } = usePostStore();
  const { id } = useParams<{ id: string }>();
  const cachedPost: PostData | undefined = queryClient.getQueryData([
    'postdetail',
    Number(id),
  ]);

  useEffect(() => {
    if (cachedPost) {
      setPostData(cachedPost as PostData); // 타입 단언
    }
  }, [cachedPost]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
      e.target.value = '';
    }
  };

  const { mutate: editPostMutate } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['infinitePosts'] });
    },
  });

  const uploadImage = async (file: File) => {
    try {
      const url = await uploadImageToFirebase(file);
      setPostData({ ...postData, thumb: url });
      console.log(postData);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageDelete = () => {
    setPostData({ ...postData, thumb: '' });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setPostData({ ...postData, title: newTitle });
  };

  const handleEdit = () => {
    const updatedPostData = {
      ...postData,
      description: extractTextFromHTML(postData.content),
    };

    if (!updatedPostData.title?.trim()) {
      notify('제목을 입력해주세요.');
    } else if (!updatedPostData.description.trim()) {
      notify('내용을 입력해주세요.');
    } else if (updatedPostData.showStatus === undefined) {
      notify('공개/비공개 선택이 필요합니다.');
    } else {
      editPostMutate(updatedPostData);
      notify('게시글 수정 완료');
      setPostData({
        thumb: '',
        title: '',
        description: '',
        content: '',
      });
      navigate('/home');
    }
  };

  return (
    <div>
      <Header />
      <div className=" flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <input
            className="text-xl mt-3 mb-2 w-[40vw] border-b-2 border-gray focus:outline-none text-g"
            placeholder="제목"
            onChange={handleTitleChange}
            value={postData?.title}
          />
          <Editor />
          <div className="flex flex-row">
            <img
              alt="썸네일 이미지"
              src={postData?.thumb || defaultThumb}
              className="flex flex-col w-[8vw] h-16 mt-14 border-gray border-2 rounded-sm"
            />
            <div className="flex flex-col  mt-14">
              <button className="w-28 h-6 ml-6 border-gray border-2 mb-[7px] rounded-sm font-MangoRegular  text-sm m hover:bg-slate-50 transition-colors">
                <label htmlFor="fileInput">이미지 업로드</label>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </button>
              <button
                onClick={handleImageDelete}
                className=" h-6 ml-6 border-gray border-2 mt-[7px] rounded-sm font-MangoRegular text-sm hover:bg-slate-50 transition-colors"
              >
                썸네일 제거
              </button>
            </div>

            <div className="flex flex-col ml-2 mt-14">
              <PrivateButton />
              <button
                onClick={handleEdit}
                className="bg-darkblue text-xl text-white border-2 mt-[0px] rounded-md ml-4 border-darkblue font-MangoRegular  hover:bg-blue-900"
              >
                수&nbsp;&nbsp;&nbsp;정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
