import ReviewList from '@/components/common/ReviewList';
import { QUERYSTRING } from '@/constance/querystring';
import { useReviews } from '@/hooks/useReviews';
import Layout from '@/layout/Layout';

import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const category = [
  {
    id: 1,
    name: '디지털',
  },
  {
    id: 2,
    name: '의류',
  },
  {
    id: 3,
    name: '가구/인터리어',
  },
  {
    id: 4,
    name: '가전',
  },
  {
    id: 5,
    name: '문화',
  },
  {
    id: 6,
    name: '식품',
  },
  {
    id: 7,
    name: '뷰티/미용',
  },
  {
    id: 8,
    name: '장소',
  },
  {
    id: 9,
    name: '기타',
  },
];

function ReviewListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    reviews,
    isLoadingFetchReviews,
    fetchReviewsNextPage,
    hasNextPageFetchReviews,
  } = useReviews();

  const handleCategoryIdParams = (id: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (id === null || !id) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleIsVerifiedParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.IS_VERIFIED)) {
      newSearchParams.delete(QUERYSTRING.IS_VERIFIED);
    } else {
      newSearchParams.set(QUERYSTRING.IS_VERIFIED, 'true');
    }

    setSearchParams(newSearchParams);
  };

  return (
    <Layout title="리뷰 목록" showBackButton={false}>
      {/* 카테고리 컴포넌트가 구현되면 교체 */}
      <CategoryList>
        {category.map(({ id, name }) => (
          <li key={id} onClick={() => handleCategoryIdParams(id)}>
            <button>{name}</button>
          </li>
        ))}
        <li onClick={handleIsVerifiedParams}>
          <button>인증</button>
        </li>
      </CategoryList>
      <ReviewList
        reviews={reviews}
        isLoading={isLoadingFetchReviews}
        hasNextPage={hasNextPageFetchReviews}
        fetchNextPage={fetchReviewsNextPage}
      />
    </Layout>
  );
}

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export default ReviewListPage;
