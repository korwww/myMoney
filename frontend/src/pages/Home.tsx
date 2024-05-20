import styled from 'styled-components';

import Layout from '@/layout/Layout';
import ReviewList from '@/components/common/ReviewList';

import { useReviews } from '@/hooks/useReviews';
import Category from '@/components/common/Category';
import BestReviews from '@/components/Review/BestReviews';

function Home() {
  const { reviews, isLoadingFetchReviews, fetchReviewsNextPage } = useReviews();
  return (
    <Layout showBackButton={false}>
      <HomeStyle>
        <BestReviews reviews={reviews} isLoading={false} />
        <Category />
        <hr />
        <ReviewList
          title={'최신글'}
          reviews={reviews}
          isLoading={false}
          text={'최신'}
        />
      </HomeStyle>
    </Layout>
  );
}

const HomeStyle = styled.div`
  max-width: 100%;
  max-height: 100%;

  hr {
    margin: 20px 0;
  }
`;

export default Home;
