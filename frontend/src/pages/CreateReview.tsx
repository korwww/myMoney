import CategorySelector from '@/components/CreateReview/CategorySelect';
import CreateContent from '@/components/CreateReview/CreateContent';
import PhotoUpload from '@/components/CreateReview/PhotoUpload';
import StarRating from '@/components/CreateReview/StarRating';
import ReceiptUpload from '@/components/CreateReview/ReceiptUpload';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useReview } from '@/hooks/useReview';
import Header from '@/layout/Header';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IReview } from '@/models/review.model';
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

function CreateReview() {
  const [ratingIndex, setRatingIndex] = useState<number>(3);
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [receiptImg, setReceiptImg] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [photoToAddList, setPhotoToAddList] = useState<string[]>([]);

  const { addToReview } = useReview();
  const navigate = useNavigate();
  const {isLoggedIn} = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn &&'/create'.includes(location.pathname)) {
      alert('로그인이 필요합니다.')
      navigate('/login');
    }
  }, [isLoggedIn, location.pathname]);

  const isFormValid =
    title.trim() !== '' &&
    content.trim() !== '' &&
    photoToAddList.length > 0 &&
    receiptImg !== '';

  const handleSubmit = () => {
    const data: IReview = {
      title,
      content,
      stars: ratingIndex,
      categoryId: categoryIndex,
      reviewImg: photoToAddList,
      receiptImg,
    };

    console.log('data', data);
    //addToReview(data);
  };


  return (
    <>
      <Header showBackButton={true} title="리뷰 작성" />

      <CreateReviewStyled>
        <PhotoUpload photoToAddList={photoToAddList} setPhotoToAddList={setPhotoToAddList} />

        <ReceiptUpload receiptImg={receiptImg}  setReceiptImg={setReceiptImg} />

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
          onChange={(e) => setTitle(e.target.value)}
        />

        <Title>내용</Title>
        <CreateContent onChange={setContent} />

        <ButtonContainer>
          <Button
            size="large"
            scheme="primary"
            $fullWidth={true}
            type="submit"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            작성완료
          </Button>
        </ButtonContainer>
      </CreateReviewStyled>
    </>
  );
}

export default CreateReview;

const CreateReviewStyled = styled.div`
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
