import { Camera } from '@/assets/icons/Camera';
import StarRating from '@/components/CreateReview/StarRating';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import Input from '@/components/common/Input';
import Layout from '@/layout/Layout';
import { useRef, ChangeEvent, useState } from 'react';
import styled from 'styled-components';

function CreateReview() {
  const [ratingIndex, setRatingIndex] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      console.log('Selected file:', selectedFile);
    }
  };

  return (
    <Layout showBackButton={true} title="리뷰작성">
      <ImageContainer>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <ImgUploadBtn onClick={handleUpload}>
          <Camera />
          <p>사진 첨부</p>
        </ImgUploadBtn>
      </ImageContainer>

      <ButtonContainer>
        <Button size="medium" scheme="disabled" $fullWidth={true}>
          영수증 리뷰 인증
        </Button>
      </ButtonContainer>

      <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />

      <div>카테고리</div>


      <Input $inputType="text" type="text" placeholder="제목을 입력해주세요" />
      <Input $inputType="text" type="text" placeholder="내용을 입력해주세요" />
    </Layout>
  );
}

export default CreateReview;

const ImageContainer = styled.div`
  height: 90px;
  width: 100%;
  padding: 16px;
  background-color: red;
`;

const ImgUploadBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.color.border};
  background-color: white;

  p {
    font-size: ${({ theme }) => theme.text.small.fontSize};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 358px;
  margin: 0px 16px;
`;
