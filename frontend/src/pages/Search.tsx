import Layout from '@/layout/Layout';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import { MagnifyingGlass } from '@/assets/icons/MagnifyingGlass';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // useHistory 추가
import { useReviews } from '@/hooks/useReviews';
import { SmallX } from '@/assets/icons/SmallX';
import ReviewList from '@/components/common/ReviewList';
import NoRecentSearchResult from '@/components/common/NoRecentSearchResult';

interface Ikey {
  id: number;
  text: string;
}

function Search() {
  const handleKeywordClick = (text: string) => {
    setValue('query', text); // 검색어 설정
    setSearchParams({ query: text }); // URL 파라미터 설정
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [keywords, setKeywords] = useState<Ikey[]>(() => {
    const savedKeywords = localStorage.getItem('keywords');
    return savedKeywords ? JSON.parse(savedKeywords) : [];
  });
  const { reviews, isLoadingFetchReviews, fetchReviewsNextPage } = useReviews();
  const { register, handleSubmit, setValue } = useForm<{ query: string }>();

  const onSubmit = (data: { query: string }) => {
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

  const buttonRef = useRef<null | HTMLButtonElement>(null);

  const handleRemoveKeyword = (id: number) => {
    const nextKeyword = keywords.filter((keyword) => keyword.id !== id);
    setKeywords(nextKeyword);
  };

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([]);
  };

  const handleCancelSearch = () => {
    setValue('query', '');
    setSearchParams();
  };

  return (
    <Layout showBackButton={false} title="검색">
      <div>
        {/* 검색 인풋 박스 */}
        <StickyContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
              <Button type="submit" ref={buttonRef} />
              <SearchIcon
                onClick={() => {
                  if (buttonRef.current !== null) {
                    buttonRef.current.click();
                  }
                }}
              >
                <MagnifyingGlass />
              </SearchIcon>

              <CancelIcon onClick={handleCancelSearch}>
                <SmallX />
              </CancelIcon>

              <StyledInput
                defaultValue={String(searchParams.get('query') || '')}
                $inputType="text"
                {...register('query', { required: true })}
                type="text"
                placeholder="검색어를 입력해주세요"
              />
            </Fieldset>
          </Form>
        </StickyContainer>

        {/* 검색하지 않았을 때 보여줄 화면 (최근 검색어도 없음) */}
        {!searchParams.get('query') && keywords.length === 0 && (
          <NoRecentSearchResult text="최근 검색어가 없습니다." />
        )}

        {/* 검색하지 않았을 때 보여줄 화면 (최근 검색어가 있을 때) */}
        {!searchParams.get('query') && keywords.length > 0 && (
          <RecentKeywordContainer>
            <div className="SearchClearKeyword">
              <h2>최근검색어</h2>
              {keywords.length ? (
                <ClearAllButton type="button" onClick={handleClearKeywords}>
                  전체 삭제
                </ClearAllButton>
              ) : null}
            </div>

            {keywords.map((keyword) => (
              <RecentKeywordInnerContainer
                key={keyword.id}
                onClick={() => handleKeywordClick(keyword.text)}
              >
                <div className="RecentKeywordItem">{keyword.text}</div>
                <RecentKeywordCancelIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveKeyword(keyword.id);
                  }}
                >
                  <SmallX />
                </RecentKeywordCancelIcon>
              </RecentKeywordInnerContainer>
            ))}
          </RecentKeywordContainer>
        )}

        {/* 검색어를 입력했을 때 보여줄 화면 */}
        {searchParams.get('query') && (
          <div>
            <ReviewList
              title="검색 결과"
              reviews={reviews}
              isLoading={isLoadingFetchReviews}
              text={<NoRecentSearchResult text="검색한 결과가 없습니다." />}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

const RecentKeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 15px;
  h2 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  .RecentKeywordItem:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .SearchClearKeyword {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const RecentKeywordInnerContainer = styled.div`
  padding: 19px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
`;

const ClearAllButton = styled.button`
  color: ${({ theme }) => theme.color.border};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 12px;
  cursor: pointer;
  background: none;
  border: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  margin-bottom: 28px;
`;

const Form = styled.form``;

const Fieldset = styled.fieldset`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input)`
  padding-left: 50px;
  height: 40px;
  box-sizing: border-box;
  width: 100%;
`;

const Button = styled.button`
  display: none;
`;

const SearchIcon = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

const cancelIconStyle = css`
  fill: ${({ theme }) => theme.color.disabled};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CancelIcon = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  ${cancelIconStyle};
`;

const RecentKeywordCancelIcon = styled.div`
  ${cancelIconStyle};
`;

export default Search;
