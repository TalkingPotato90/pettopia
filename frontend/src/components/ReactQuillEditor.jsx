import ReactQuill from 'react-quill';
import 'react-quill-new/dist/quill.snow.css';

function ReactQuillEditor({ style, value, onChange }) {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ size: [] }],
        [{ font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        [{ color: [] }, { background: [] }, { align: [] }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  };

  return (
    <ReactQuill
      style={style}
      modules={modules}
      value={value}
      onChange={onChange}
    />
  );
}
export default ReactQuillEditor;
