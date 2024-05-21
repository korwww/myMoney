import CommentList from '@/components/Comment/CommentList';
import ReviewContent from '@/components/Review/ReviewContent';
import ReviewImages from '@/components/Review/ReviewImages';
import { useReviewDetail } from '@/hooks/useReviewDetail';
import Layout from '@/layout/Layout';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function ReviewDetail() {
  const { id } = useParams();
  const { review } = useReviewDetail(id);
  if (!review) return;
  return (
    <Layout showBackButton={true}>
      <ReviewDetailStyle>
        <ReviewImages reviewImages={review.reviewImg} title={review.title} />

        <ReviewContent />

        <CommentList />
      </ReviewDetailStyle>
    </Layout>
  );
}

const ReviewDetailStyle = styled.article``;

export default ReviewDetail;
