import { useEffect } from 'react';
import styled from 'styled-components';
import PhotoUpload from '@/components/Review/PhotoUpload';
import StarRating from '@/components/Review/StarRating';
import ReceiptUpload from '@/components/Review/ReceiptUpload';
import CategorySelector from '@/components/Review/CategorySelect';
import CreateContent from '@/components/Review/CreateContent';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/auth.store';

const categoryOptions = [
  '디지털',
  '의류',
  '가구/인테리어',
  '가전',
  '문화',
  '식품',
  '뷰티/미용',
  '장소',
  '기타',
];

interface ReviewFormProps {
  titleValue: string;
  contentValue: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  ratingIndex: number;
  setRatingIndex: React.Dispatch<React.SetStateAction<number>>;
  categoryIndex: number;
  setCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  receiptImg: string;
  setReceiptImg: React.Dispatch<React.SetStateAction<string>>;
  photoToAddList: string[];
  setPhotoToAddList: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: () => void;
  isFormValid: boolean;
}

function ReviewForm({
  titleValue,
  contentValue,
  setTitle,
  setContent,
  ratingIndex,
  setRatingIndex,
  categoryIndex,
  setCategoryIndex,
  receiptImg,
  setReceiptImg,
  photoToAddList,
  setPhotoToAddList,
  handleSubmit,
  isFormValid,
}: ReviewFormProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn && '/review'.includes(location.pathname)) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [isLoggedIn, location.pathname]);

  return (
    <ReviewFormStyled>
      <PhotoUpload
        photoToAddList={photoToAddList}
        setPhotoToAddList={setPhotoToAddList}
      />

      <ReceiptUpload receiptImg={receiptImg} setReceiptImg={setReceiptImg} />

      <StarRating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />

      <CategorySelector
        categoryOptions={categoryOptions}
        categoryIndex={categoryIndex}
        setCategoryIndex={setCategoryIndex}
      />

      <Title>제목</Title>
      <Input
        $inputType="text"
        type="text"
        placeholder="제목을 입력해주세요"
        value={titleValue}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Title>내용</Title>
      <CreateContent content={contentValue} onChange={setContent} />

      <ButtonContainer>
        <Button
          size="large"
          scheme="primary"
          $fullWidth={true}
          type="submit"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          완료
        </Button>
      </ButtonContainer>
    </ReviewFormStyled>
  );
}

export default ReviewForm;

const ReviewFormStyled = styled.div`
  padding: 0px 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 358px;
`;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.text['medium'].fontSize};
  margin: 8px 0px;
  line-height: 1.2;
`;