import { useState } from 'react';
import { useReview } from '@/hooks/useReview';
import Header from '@/layout/Header';
import ReviewForm from '@/components/Review/ReviewForm';

function CreateReview() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [ratingIndex, setRatingIndex] = useState<number>(3);
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
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
      categoryId: categoryIndex,
      reviewImg: photoToAddList,
      receiptImg,
    };
    console.log('data', data);
    addToReview(data);
  };

  return (
    <>
      <Header showBackButton={true} title="리뷰 작성" />
      <ReviewForm
        titleValue={title}
        contentValue={content}
        setTitle={setTitle}
        setContent={setContent}
        ratingIndex={ratingIndex}
        setRatingIndex={setRatingIndex}
        categoryIndex={categoryIndex}
        setCategoryIndex={setCategoryIndex}
        receiptImg={receiptImg}
        setReceiptImg={setReceiptImg}
        photoToAddList={photoToAddList}
        setPhotoToAddList={setPhotoToAddList}
        handleSubmit={handleSubmit}
        isFormValid={isFormValid}
      />
    </>
  );
}

export default CreateReview;
