import { useSearchParams } from 'react-router-dom';

import ReviewList from '@/components/common/ReviewList';
import { QUERYSTRING } from '@/constance/querystring';
import { useReviews } from '@/hooks/useReviews';
import Layout from '@/layout/Layout';

function ReviewListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    reviews,
    isLoadingFetchReviews,
    fetchReviewsNextPage,
    hasNextPageFetchReviews,
  } = useReviews();

  const handleCategoryIdParams = (id: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (!id) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    newSearchParams.delete(QUERYSTRING.IS_VERIFIED);
    setSearchParams(newSearchParams);
  };

  const handleIsVerifiedParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.IS_VERIFIED)) {
      newSearchParams.delete(QUERYSTRING.IS_VERIFIED);
    } else {
      newSearchParams.set(QUERYSTRING.IS_VERIFIED, 'true');
    }

    newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    setSearchParams(newSearchParams);
  };

  return (
    <Layout title="리뷰 목록" showBackButton={false}>
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
