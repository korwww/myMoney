import styled from 'styled-components';

import Layout from '@/layout/Layout';
import ReviewList from '@/components/common/ReviewList';

import { useReviews } from '@/hooks/useReviews';
import Category from '@/components/common/Category';
import BestReviews from '@/components/Review/BestReviews';

function Home() {
  const { reviews, isLoadingFetchReviews, fetchReviewsNextPage } = useReviews();
  return (
    <HomeStyle>
      <Layout showBackButton={false}>
        <p>기본 굵기</p>
        <SemiBoldText>600 굵기</SemiBoldText>
        <BoldText>700 굵기</BoldText>
        <BestReviews />
        <Category />
        <hr />
        <ReviewList
          title={'최신글'}
          reviews={reviews}
          isLoading={false}
          text={'최신'}
        />
      </Layout>
    </HomeStyle>
  );
}

const SemiBoldText = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;
const BoldText = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const HomeStyle = styled.div`
  hr {
    margin: 20px 0;
  }
`;

export default Home;
