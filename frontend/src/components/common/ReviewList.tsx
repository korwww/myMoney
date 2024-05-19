import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import styled from 'styled-components';

import ReviewItem from './ReviewItem';
import { IReviewItem } from '@/models/review.model';
import Loading from './Loading';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export interface IReviewListProps {
  reviews: IReviewItem[];
  title?: string;
  isLoading?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => Promise<InfiniteQueryObserverResult>;
}

function ReviewList({
  reviews,
  title,
  isLoading,
  hasNextPage,
  fetchNextPage,
}: IReviewListProps) {
  console.log(hasNextPage);
  const { observerRef } = useIntersectionObserver(fetchNextPage);
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

export default ReviewList;
