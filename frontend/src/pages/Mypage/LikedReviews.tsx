import React from 'react';
import Layout from '@/layout/Layout';
import { useLikedReviews } from '@/hooks/useLikedReviews';
import Loading from '@/components/common/Loading';

const LikedReviews = () => {
  const { data, isLoading, error } = useLikedReviews();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <Layout showBackButton={true} title="내가 좋아요 누른 리뷰">
      {data && data.length > 0 ? (
        data.map((review) => (
          <div key={review.id}>
            <h3>{review.title}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>좋아요 누른 리뷰가 없습니다.</p>
      )}
    </Layout>
  );
};

export default LikedReviews;
