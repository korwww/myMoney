import React from 'react';
import Layout from '@/layout/Layout';
import { useMyReviews } from '@/hooks/useMyReviews';
import { IReviewItem } from '@/models/review.model';

function MyReviews() {
  const { data: reviews, isLoading, error } = useMyReviews();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <Layout showBackButton={true} title="내가 작성한 리뷰">
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

export default MyReviews;
