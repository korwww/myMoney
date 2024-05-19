import styled from 'styled-components';
import { Badge } from '@/components/common/ReviewItem.style';
import BadgeImg from '@/assets/images/badge-img.png';
import ImageSlide from '../common/ImageSlide';

function BestReviews() {
  return (
    <BestReviewsStyle>
      <Badge>
        <img className="badgeImg" src={BadgeImg} alt="인증마크" />
        인증
      </Badge>
      <Badge>베스트</Badge>
      <ImageSlide />
    </BestReviewsStyle>
  );
}

const BestReviewsStyle = styled.div``;

export default BestReviews;
