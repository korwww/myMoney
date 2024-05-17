import ReviewList from '@/components/common/ReviewList';
import { useReviews } from '@/hooks/useReviews';
import Layout from '@/layout/Layout';

function ReviewListPage() {
  const { reviews, isLoadingFetchReviews, fetchReviewsNextPage } = useReviews();

  return (
    <Layout title="리뷰 목록" showBackButton={false}>
      <ReviewList reviews={reviews} isLoading={isLoadingFetchReviews} />
    </Layout>
  );
}

export default ReviewListPage;
