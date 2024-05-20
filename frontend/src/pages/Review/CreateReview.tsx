import { useState } from 'react';
import { useReview } from '@/hooks/useReview';
import Header from '@/layout/Header';
import ReviewForm from '@/components/Review/ReviewForm';
import { FormStyled } from './EditReview';

function CreateReview() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [ratingIndex, setRatingIndex] = useState<number>(3);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [receiptImg, setReceiptImg] = useState<string>('');
  const [photoToAddList, setPhotoToAddList] = useState<string[]>([]);

  const { addToReview } = useReview();

  const isFormValid =
    title.trim() !== '' &&
    content.trim() !== '' &&
    photoToAddList.length > 0 &&
    receiptImg !== '';

  const handleSubmit = () => {
    const data = {
      title,
      content,
      stars: ratingIndex,
      categoryId: selectedCategoryId,
      reviewImg: photoToAddList,
      receiptImg,
    };
    addToReview(data);
  };

  return (
    <FormStyled>
      <Header showBackButton={true} title="리뷰 작성" />
      <ReviewForm
        titleValue={title}
        contentValue={content}
        setTitle={setTitle}
        setContent={setContent}
        ratingIndex={ratingIndex}
        setRatingIndex={setRatingIndex}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        receiptImg={receiptImg}
        setReceiptImg={setReceiptImg}
        photoToAddList={photoToAddList}
        setPhotoToAddList={setPhotoToAddList}
        handleSubmit={handleSubmit}
        isFormValid={isFormValid}
      />
    </FormStyled>
  );
}

export default CreateReview;

