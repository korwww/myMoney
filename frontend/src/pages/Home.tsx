import styled from 'styled-components';

import Layout from '@/layout/Layout';
import ReviewList from '@/components/common/ReviewList';

import Category from '@/components/common/Category';
import BestReviews from '@/components/Home/BestReviews';
import { useEffect, useState } from 'react';
import { fetchReviews } from '@/api/review.api';

export interface IResponseReviews {
  categoryId: number;
  content: string;
  createdAt: Date;
  id: number;
  isMyReview: number;
  likes: number;
  reviewImg: string;
  stars: number;
  title: string;
  userId: number;
  userName: string;
  verified: number;
}

function Home() {
  const [bestReviews, setBestReviews] = useState<IResponseReviews[]>([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [isLoadingBestReviews, setIsLoadingBestReviews] = useState(false);
  const [isLoadingLatestReviews, setIsLoadingLatestReviews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingBestReviews(true);
        const bestReviewsResponse = await fetchReviews({
          sortBy: 'likes',
          orderBy: 'DESC',
          limit: 3,
        });
        setBestReviews(bestReviewsResponse.reviews);

        setIsLoadingLatestReviews(true);
        const latestReviewsResponse = await fetchReviews({
          sortBy: 'createdAt',
          orderBy: 'DESC',
        });
        setLatestReviews(latestReviewsResponse.reviews);
      } catch (error) {
        throw error;
      } finally {
        setIsLoadingBestReviews(false);
        setIsLoadingLatestReviews(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout showBackButton={false}>
      <HomeStyle>
        <BestReviews reviews={bestReviews} isLoading={isLoadingBestReviews} />
        <Category />
        <hr />
        <ReviewList
          title={'최신글'}
          reviews={latestReviews}
          isLoading={isLoadingLatestReviews}
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
