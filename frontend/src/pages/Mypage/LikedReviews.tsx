import React from 'react';
import Layout from '@/layout/Layout';
import { useLikedReviews } from '@/hooks/useLikedReviews';
import { IReviewItem } from '@/models/review.model';

function LikedReviews() {
  const { data: reviews, isLoading, error } = useLikedReviews();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <Layout showBackButton={true} title="내가 좋아요 누른 리뷰">
      <div>
        {reviews?.map((review: IReviewItem) => (
          <div key={review.id}>
            <h2>{review.title}</h2>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default LikedReviews;
