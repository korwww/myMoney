import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';

import Layout from '@/layout/Layout';
import { useReviews } from '@/hooks/useReviews';
import ReviewList from '@/components/common/ReviewList';
import NoRecentSearchResult from '@/components/Search/NoRecentSearchResult';
import SearchInputBox from '@/components/Search/SearchInputBox';
import RecentKeyword from '@/components/Search/RecentKeyword';

export interface IRecentKeywordKey {
  id: number;
  text: string;
}

export interface ISearchForm {
  query: string;
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keywords, setKeywords] = useState<IRecentKeywordKey[]>(() => {
    const savedKeywords = localStorage.getItem('keywords');
    return savedKeywords ? JSON.parse(savedKeywords) : [];
  });
  const {
    reviews,
    isLoadingFetchReviews,
    fetchReviewsNextPage,
    hasNextPageFetchReviews,
  } = useReviews();
  const { register, handleSubmit, setValue } = useForm<ISearchForm>();

  const onSubmit = (data: ISearchForm) => {
    setSearchParams({ query: data.query });
    const newKeyword = {
      id: Date.now(),
      text: data.query,
    };
    const updatedKeywords = [
      newKeyword,
      ...keywords.filter((keyword) => keyword.text !== data.query),
    ];
    setKeywords(updatedKeywords.slice(0, 5));
  };

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  // 최근검색어 클릭 시 검색 적용
  const handleRecentKeywordClick = (text: string) => {
    setValue('query', text);
    setSearchParams({ query: text });
  };

  // 최근검색어 삭제
  const handleRemoveRecentKeyword = (id: number) => {
    const nextKeyword = keywords.filter((keyword) => keyword.id !== id);
    setKeywords(nextKeyword);
  };

  // 최근검색어 전체 삭제
  const handleClearRecentKeywords = () => {
    setKeywords([]);
  };

  // 검색 취소
  const handleCancelSearch = () => {
    setValue('query', '');
    setSearchParams();
  };

  return (
    <Layout showBackButton={false} title="검색">
      <SearchInputBox
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        handleCancelSearch={handleCancelSearch}
      />

      {/* 검색하지 않았을 때 보여줄 화면 (최근 검색어) */}
      {!searchParams.get('query') && (
        <RecentKeyword
          keywords={keywords}
          handleClearRecentKeywords={handleClearRecentKeywords}
          handleRemoveRecentKeyword={handleRemoveRecentKeyword}
          handleRecentKeywordClick={handleRecentKeywordClick}
        />
      )}

      {/* 검색어를 입력했을 때 보여줄 화면 */}
      {searchParams.get('query') && (
        <div>
          <ReviewList
            title="검색 결과"
            reviews={reviews}
            isLoading={isLoadingFetchReviews}
            text={<NoRecentSearchResult text="검색한 결과가 없습니다." />}
            fetchNextPage={fetchReviewsNextPage}
            hasNextPage={hasNextPageFetchReviews}
          />
        </div>
      )}
    </Layout>
  );
}

const cancelIconStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  fill: ${({ theme }) => theme.color.disabled};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const RecentKeywordCancelIcon = styled.div`
  ${cancelIconStyle};
`;

export const CancelIcon = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  ${cancelIconStyle};
`;

export default Search;
