import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import styled from 'styled-components';

import ReviewItem from './ReviewItem';
import { IReviewItem } from '@/models/review.model';
import Loading from './Loading';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export interface IReviewListProps {
  reviews: IReviewItem[];
  title?: string;
  isLoading?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => Promise<InfiniteQueryObserverResult>;
  text?: string;
}

function ReviewList({
  reviews,
  title,
  isLoading,
  text,
  fetchNextPage,
  hasNextPage,
}: IReviewListProps) {
  const { observerRef } = useIntersectionObserver(fetchNextPage);
  return (
    <div>
      {title && <Title>{title}</Title>}
      {!reviews.length && <EmptyReviews>{text} 리뷰가 없습니다.</EmptyReviews>}
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}

      {isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}

      {hasNextPage && <ObserverDiv id="more" ref={observerRef}></ObserverDiv>}
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

const ObserverDiv = styled.div`
  height: 1px;
`;

export const Title = styled.h3`
  padding: 0 16px;
  font-size: ${({ theme }) => theme.heading['small'].fontSize};
`;

export default ReviewList;
