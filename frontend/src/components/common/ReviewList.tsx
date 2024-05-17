import styled from 'styled-components';
import ReviewItem from './ReviewItem';
import { IReviewItem } from '@/models/review.model';

export interface IReviewListProps {
  reviews: IReviewItem[];
  title?: string;
}

function ReviewList({ reviews, title }: IReviewListProps) {
  return (
    <div>
      {title && <h3>{title}</h3>}
      {!reviews.length && <EmptyReviews>등록된 리뷰가 없습니다.</EmptyReviews>}
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </div>
  );
}

const EmptyReviews = styled.p`
  padding-top: 45vh;
  text-align: center;
`;

export default ReviewList;
