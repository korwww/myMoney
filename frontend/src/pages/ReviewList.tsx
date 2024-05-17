import ReviewList from '@/components/common/ReviewList';
import { useReviews } from '@/hooks/useReviews';
import Layout from '@/layout/Layout';

const reviews22 = [
  {
    title: '사당역점 안뇽 필라테스',
    createdAt: '2024.05.17',
    userName: '김내동',
    imgSrc:
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/24c98195-2ba2-4bb2-b7dc-44f48c34c914.jpeg',
    content:
      '필라테스에 대해 더 잘 알게되었고 재미있고 꾸준하게 다니게 되었어요~ 선생님들도 꼼꼼하고 친절하시고 각자의 숙련도에 맞게 티칭해주셔서 좋고, 날이 갈수록 느는게 느껴져서 뿌듯합니다. 시설도',
    verified: true,
    likes: 3,
    userId: 15,
    id: 1,
    isMyReview: false,
    isLiked: false,
  },
  {
    title: '사당역점 안뇽 필라테스',
    createdAt: '2024.05.17',
    userName: '김내동',
    imgSrc:
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/24c98195-2ba2-4bb2-b7dc-44f48c34c914.jpeg',
    content:
      '필라테스에 대해 더 잘 알게되었고 재미있고 꾸준하게 다니게 되었어요~ 선생님들도 꼼꼼하고 친절하시고 각자의 숙련도에 맞게 티칭해주셔서 좋고, 날이 갈수록 느는게 느껴져서 뿌듯합니다. 시설도',
    verified: false,
    likes: 3,
    userId: 15,
    id: 1,
    isMyReview: true,
    isLiked: true,
  },
];

function ReviewListPage() {
  const { reviews, isLoadingFetchReviews, fetchReviewsNextPage } = useReviews();

  return (
    <Layout title="리뷰 목록" showBackButton={false}>
      <ReviewList reviews={reviews} isLoading={isLoadingFetchReviews} />
    </Layout>
  );
}

export default ReviewListPage;
