import { useParams } from 'react-router-dom';

import CommentList from '@/components/Comment/CommentList';
import ReviewContent from '@/components/Review/ReviewContent';
import ReviewImages from '@/components/Review/ReviewImageSlider/ReviewImages';
import { useReviewDetail } from '@/hooks/useReviewDetail';
import Layout from '@/layout/Layout';

function ReviewDetail() {
  const { id } = useParams();
  const { review } = useReviewDetail(id);
  if (!review) return;
  return (
    <Layout showBackButton={true}>
      <article>
        <ReviewImages reviewImages={review.reviewImg} title={review.title} />

        <ReviewContent />

        <CommentList />
      </article>
    </Layout>
  );
}

export default ReviewDetail;
