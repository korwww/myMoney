import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReview } from '@/hooks/useReview';
import Header from '@/layout/Header';
import ReviewForm from '../../components/Review/ReviewForm';
import styled from 'styled-components';

function EditReview() {
  const { id } = useParams<{ id: string }>();
  const { review } = useReview(id!);
  const { updateToReview } = useReview();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [ratingIndex, setRatingIndex] = useState<number>(3);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
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
      setSelectedCategoryId(review.categoryId || 1);
      setReceiptImg(review.receiptImg || '');
      setPhotoToAddList(review.reviewImg || []);
    }
  }, [review]);

  const handleSubmit = () => {
    const data = {
      id,
      title,
      content,
      stars: ratingIndex,
      categoryId: selectedCategoryId,
      reviewImg: photoToAddList,
      receiptImg,
    };
    updateToReview(id!, data);
  };

  return (
    <FormStyled>
      <Header showBackButton={true} title="리뷰 수정" />
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

export default EditReview;

export const FormStyled = styled.div`
  max-width: 390px;
  margin-inline: auto;
  padding: ${({ theme }) => theme.padding.mainContent};
`;
