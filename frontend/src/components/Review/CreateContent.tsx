import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

interface CreateContentProps {
  content: string;
  onChange: (value: string) => void;
}

function CreateContent({ content, onChange }: CreateContentProps) {
  const [charCount, setCharCount] = useState(0);
  const MAX_CONTENT_LENGTH = 1000;
  const count = content.replace(/(<([^>]+)>)/gi, '').trim().length;

  useEffect(() => {
    setCharCount(count);
  }, [content]);

  const handleQuillChange = (content: string) => {
    if (count <= MAX_CONTENT_LENGTH) {
      setCharCount(count);
      onChange(content);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Backspace' && count >= MAX_CONTENT_LENGTH) {
      event.preventDefault();
      return;
    }
  };

  return (
    <>
      <ReactQuillStyled>
        <ReactQuill
          value={content}
          style={{ width: '100%', height: '270px' }}
          modules={modules}
          onChange={handleQuillChange}
          onKeyDown={handleKeyDown}
        />
      </ReactQuillStyled>
      <CharacterCount>
        {charCount}/{MAX_CONTENT_LENGTH}
      </CharacterCount>
    </>
  );
}

export default CreateContent;

const ReactQuillStyled = styled.div`
  width: 100%;
  height: 340px;
`;

const CharacterCount = styled.div`
  font-size: 12px;
  text-align: end;
`;


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
