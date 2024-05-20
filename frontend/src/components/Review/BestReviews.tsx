import styled from 'styled-components';

import ImageSlide from '../common/ImageSlide';
import BestReview from './BestReview';
import { LoadingContainer } from '../Admin/AdminContent';
import Loading from '../common/Loading';

interface Props {
  reviews?: React.ReactNode[];
  isLoading?: boolean;
}

const items = [
  <BestReview
    img={'https://www.juso.go.kr/img/content/know_addr_2.png'}
    isVerified={false}
    title="타이이틀"
    userName="삼성맨"
    stars={5}
    page="1/3"
  />,
  <BestReview
    img={
      'https://www.akamai.com/site/en/images/promo/2023/what-is-ip-address-video.jpg'
    }
    isVerified={true}
    title="타2222틀"
    userName="애플맨"
    stars={4}
    page="2/3"
  />,
  <BestReview
    img={'https://t1.daumcdn.net/cfile/tistory/233A1242547D20FC0F'}
    isVerified={true}
    title="제333목"
    userName="인텔맨"
    stars={1}
    page="3/3"
  />,
];

function BestReviews({ reviews, isLoading }: Props) {
  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <BestReviewsStyle>
      {items ? <ImageSlide items={items} /> : <div></div>}
    </BestReviewsStyle>
  );
}

const BestReviewsStyle = styled.div`
  width: 390px;
  height: 350px;
`;

export default BestReviews;
