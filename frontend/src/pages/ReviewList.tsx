import ReviewList from '@/components/common/ReviewList';
import { useReviews } from '@/hooks/useReviews';
import Layout from '@/layout/Layout';
import Category from '@/components/common/Category';

function ReviewListPage() {
  const {
    reviews,
    isLoadingFetchReviews,
    fetchReviewsNextPage,
    hasNextPageFetchReviews,
  } = useReviews();

  return (
    <Layout title="리뷰 목록" showBackButton={false}>
      <Category />
      <ReviewList
        reviews={reviews}
        isLoading={isLoadingFetchReviews}
        hasNextPage={hasNextPageFetchReviews}
        fetchNextPage={fetchReviewsNextPage}
      />
    </Layout>
  );
}

export default ReviewListPage;
