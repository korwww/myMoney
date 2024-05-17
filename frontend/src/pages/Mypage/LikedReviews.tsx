import React from 'react';
import Layout from '@/layout/Layout';
import { useLikedReviews } from '@/hooks/useLikedReviews';
import ReviewList from '@/components/common/ReviewList';

const LikedReviews = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useLikedReviews();
  console.log(data);

  return (
    <Layout showBackButton={true} title="좋아요 누른 리뷰">
      <ReviewList
        reviews={data?.pages.flatMap((page) => page.reviews) || []}
        isLoading={isLoading}
        text="좋아요를 누른"
      />
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load More</button>
      )}
    </Layout>
  );
};

export default LikedReviews;
