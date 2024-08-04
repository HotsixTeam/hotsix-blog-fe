import { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../Firebase';
import { usePostStore } from '../../store';
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);
function Editor() {
  const { postData, setPostData } = usePostStore();
  const quillRef = useRef<ReactQuill>(null);

  const editorImageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const editor = (quillRef.current as ReactQuill).getEditor();
      const file = input.files?.[0];
      const range = editor.getSelection(true);
      try {
        const storageRef = ref(storage, `image/${Date.now()}`);
        await uploadBytes(storageRef, file as File).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            editor.insertEmbed(range.index, 'image', url);
            editor.setSelection(range.index + 1, 0);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleEditorChange = (value: string) => {
    setPostData({ ...postData, content: value });
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image'],
    ['blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  // 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
  const formats = [
    'float',
    'width',
    'height',
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
  ];

  const modules = useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: toolbarOptions,
        handlers: { image: editorImageHandler },
      },
    }),
    [],
  );

  return (
    <div className="flex flex-col items-center">
      <ReactQuill
        className="w-[40vw] h-full md:h-[calc(100vh-250px)] lg:h-[calc(100vh-250px)]"
        value={postData.content || ''}
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={handleEditorChange}
        ref={quillRef}
      />
    </div>
  );
}
export default Editor;
