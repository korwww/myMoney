import React from 'react';
import Layout from '@/layout/Layout';
import { useMyReviews } from '@/hooks/useMyReviews';
import Loading from '@/components/common/Loading';

const MyReviews = () => {
  const { data, isLoading, error } = useMyReviews();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <Layout showBackButton={true} title="내가 작성한 리뷰">
      {data && data.length > 0 ? (
        data.map((review) => (
          <div key={review.id}>
            <h3>{review.title}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>작성한 리뷰가 없습니다.</p>
      )}
    </Layout>
  );
};

export default MyReviews;
