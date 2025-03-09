import React, { useRef, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import css from './QuillEditor.module.css';

Quill.register('modules/ImageResize', ImageResize);

// Create custom font size format
const Size = Quill.import('attributors/style/size');
Size.whitelist = Array.from({ length: 61 }, (_, i) => (i + 10) + 'px');
Quill.register(Size, true);

// Extend Parchment for custom left-align class
const Parchment = Quill.import('parchment');
const AlignClass = new Parchment.Attributor.Class('align', 'ql-align', {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['left', 'center', 'right', 'justify']
});
Quill.register(AlignClass, true);

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/blogimageupload', {
          method: 'POST',
          headers: {
            'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
          },
          body: formData,
        });
        
        

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const urls = await res.json();

        const quill = quillRef.current.getEditor();
        quill.focus();
        const range = quill.getSelection(true);

        urls.url.forEach((url) => {
          quill.insertEmbed(range.index, 'image', url);
          range.index++;
        });

        quill.setSelection(range.index);
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ size: Size.whitelist }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        [{ align: [] }],
        ['clean'],
        [{ color: [] }, { background: [] }],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    ImageResize: {
      parchment: Quill.import('parchment'),
    },
  }), []);

  const handleChange = (content, delta, source, editor) => {
    const quill = quillRef.current.getEditor();
    const lines = quill.getLines();
    lines.forEach((line) => {
      if (line.domNode.classList.contains('ql-align-left')) {
        line.domNode.classList.add(css.pLeftAlign);
      }
    });
    onChange(content);
  };

  return (
    <div className="p-4 w-full bg-white text-backgr shadow-md rounded-lg">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        className={css.editor}
      />
    </div>
  );
};

export default QuillEditor;
