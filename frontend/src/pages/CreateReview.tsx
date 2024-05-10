import CategorySelector from '@/components/CreateReview/CategorySelect';
import CreateContent from '@/components/CreateReview/CreateContent';
import PhotoUpload from '@/components/CreateReview/PhotoUpload';
import StarRating from '@/components/CreateReview/StarRating';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Header from '@/layout/Header';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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

interface FormData {
  review_img: FileList | null;
  receipt_img: FileList | null;
  category_id: number;
  title: string;
  content: string;
}

interface PhotoItem {
  base64: string;
}

function CreateReview() {
  const [ratingIndex, setRatingIndex] = useState<number>(3);
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [photoToAddList, setPhotoToAddList] = useState<PhotoItem[]>([]);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = () => {
    const data = {
      ...formData,
      category_id: ratingIndex,
      review_img: photoToAddList,
      receipt_img: '', // Placeholder for receipt_img
    };
    console.log('제출되는 데이터:', data);
  };

  return (
    <>
      <Header showBackButton={true} title="리뷰 작성" />

      <CreateReviewStyled>
        <PhotoUpload setPhotoToAddList={setPhotoToAddList} />

        <ButtonContainer>
          <Button size="medium" scheme="disabled" $fullWidth={true}>
            영수증 리뷰 인증
          </Button>
        </ButtonContainer>

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
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <Title>내용</Title>
        <CreateContent
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <ButtonContainer>
          <Button
            size="large"
            scheme="primary"
            $fullWidth={true}
            onClick={handleSubmit(onSubmit)}
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