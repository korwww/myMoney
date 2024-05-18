import styled from 'styled-components';
import ReviewItem from './ReviewItem';
import { IReviewItem } from '@/models/review.model';
import Loading from './Loading';

export interface IReviewListProps {
  reviews: IReviewItem[];
  title?: string;
  isLoading?: boolean;
}

function ReviewList({ reviews, title, isLoading }: IReviewListProps) {
  return (
    <div>
      {title && <h3>{title}</h3>}
      {!reviews.length && <EmptyReviews>등록된 리뷰가 없습니다.</EmptyReviews>}
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}

      {isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      <span id="more"></span>
    </div>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const EmptyReviews = styled.p`
  padding-top: 45vh;
  text-align: center;
`;

export default ReviewList;
