import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

interface CreateContentProps {
  onChange: (value: string) => void; 
}

function CreateContent({ onChange }: CreateContentProps) {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['blockquote', 'code-block'],
        [{ align: [] }],
        ['link'],
        ['clean'],
      ],
    },
  };

  const handleQuillChange = (content: string) => {
    onChange(content);
  };

  return (
    <ReactQuillStyled>
      <ReactQuill
        style={{ width: '100%', height: '300px' }}
        modules={modules}
        onChange={handleQuillChange}
      />
    </ReactQuillStyled>
  );
}

export default CreateContent;

const ReactQuillStyled = styled.div`
  width: 100%;
  height: 380px;
`;
