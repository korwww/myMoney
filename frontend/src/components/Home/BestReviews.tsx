import styled from 'styled-components';

import ImageSlide from '../common/ImageSlide';
import BestReview from './BestReview';
import { LoadingContainer } from '../Admin/AdminContent';
import Loading from '../common/Loading';
import { ReactNode } from 'react';
import { IResponseReviews } from '@/pages/Home';

interface Props {
  reviews?: IResponseReviews[];
  isLoading?: boolean;
}

function BestReviews({ reviews, isLoading }: Props) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }
  if (!reviews) {
    return (
      <BestReview
        id={0}
        img={
          'https://i0.wp.com/millionmine.com/wp-content/uploads/2020/03/reveiws.jpg?fit=1000%2C630&ssl=1'
        }
        isVerified={1}
        title={'베스트 리뷰를 써보자!'}
        userName={'내돈내산'}
        stars={5}
        page="1/1"
      />
    );
  }
  const items: ReactNode[] = reviews.map((item, idx, arr) => {
    let page = `${idx + 1} / ${arr.length}`;
    return (
      <BestReview
        id={item.id}
        img={item.reviewImg}
        isVerified={item.verified}
        title={item.title}
        userName={item.userName}
        stars={item.stars}
        page={page}
      />
    );
  });

  return (
    <BestReviewsStyle>
      {reviews && <ImageSlide items={items} />}
    </BestReviewsStyle>
  );
}

const BestReviewsStyle = styled.div`
  width: 390px;
  height: 350px;
`;

export default BestReviews;
