import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReview } from '@/hooks/useReview';
import Header from '@/layout/Header';
import ReviewForm from '../../components/Review/ReviewForm';

function EditReview() {
  const { id } = useParams<{ id: string }>();
  const { review } = useReview(id!);
  
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [ratingIndex, setRatingIndex] = useState<number>(3);
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [receiptImg, setReceiptImg] = useState<string>('');
  const [photoToAddList, setPhotoToAddList] = useState<string[]>([]);

  const isFormValid =
  title.trim() !== '' &&
  content.trim() !== '' &&
  photoToAddList.length > 0 &&
  receiptImg !== '';

  useEffect(() => {
    if (review) {
      setTitle(review.title || '');
      setContent(review.content || '');
      setRatingIndex(review.stars || 3);
      setCategoryIndex(review.categoryId || 0);
      setReceiptImg(review.reviewReceiptImg || '');
      setPhotoToAddList(review.reviewImg || []);
    }
  }, [review]);

  const handleSubmit = () => {
    const data = {
      id,
      title,
      content,
      stars: ratingIndex,
      categoryId: categoryIndex,
      reviewImg: photoToAddList,
      receiptImg,
    };
    console.log('update', data);
    //작업 해야 함
    //updateToReview(data);
  };

  return (
    <>
      <Header showBackButton={true} title="리뷰 수정" />
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

export default EditReview;
