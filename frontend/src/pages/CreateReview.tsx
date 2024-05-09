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

export interface PhotoItem {
  id: string;
  file: File;
}

function CreateReview() {
  const [ratingIndex, setRatingIndex] = useState<number>(3);
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [photoToAddList, setPhotoToAddList] = useState<PhotoItem[]>([]);
  const { register, handleSubmit } = useForm<FormData>();
  
  console.log(photoToAddList);


  const onSubmit = (data: FormData) => {
    console.log('제출되는 데이터:', {
      title,
      review_img: '',
      receipt_img: '',
      category_id: ratingIndex,
      content,
    });
  };

  const handlePhotoSelect = (files: FileList | null) => {
    const temp: PhotoItem[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        temp.push({
          id: file.name,
          file: file,
        });
      }
      setPhotoToAddList((prevList) => [...prevList, ...temp]);
    }
  };

  return (
    <>
      <Header showBackButton={true} title="리뷰 작성" />

      <CreateReviewStyled>
        <PhotoUpload
          onPhotoSelect={handlePhotoSelect}
          photoToAddList={photoToAddList}
        />

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

        <p>제목</p>
        <Input
          $inputType="text"
          type="text"
          placeholder="제목을 입력해주세요"
          onChange={(e) => setTitle(e.target.value)}
        />

        <p>내용</p>
        <CreateContent onChange={(value) => setContent(value)} />

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