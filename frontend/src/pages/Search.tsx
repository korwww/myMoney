import Layout from '@/layout/Layout';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import { MagnifyingGlass } from '@/assets/icons/MagnifyingGlass';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useReviews } from '@/hooks/useReviews';
import { SmallX } from '@/assets/icons/SmallX';
import { BigSearch } from '@/assets/icons/BigSearch';
import ReviewList from '@/components/common/ReviewList';

interface Ikey {
  id: number;
  text: string;
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  // 로컬 스토리지에 저장한 검색어를 관리할 useState keywords
  const [keywords, setKeywords] = useState<Ikey[]>([]);
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

  // 1. window 즉, 브라우저가 모두 렌더링된 상태에서 해당 함수를 실행할 수 있도록 작업
  useEffect(() => {
    const result = localStorage.getItem('keywords') || '[]';
    setKeywords(JSON.parse(result));
  }, []);

  // 2. keywords 객체를 의존하여, 변경될 경우 새롭게 localStroage의 아이템 'keywords'를 세팅한다
  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  const buttonRef = useRef<null | HTMLButtonElement>(null);

  const handleRemoveKeyword = (id: number) => {
    const nextKeyword = keywords.filter((keyword) => {
      return keyword.id != id;
    });
    setKeywords(nextKeyword);
  };

  return (
    <Layout showBackButton={false} title="검색">
      <Container>
        <StickyContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
              <Button type="submit" ref={buttonRef} />
              <SearchIcon
                onClick={() => {
                  if (buttonRef.current === null) {
                    return;
                  } else {
                    buttonRef.current.click();
                  }
                }}
              >
                <MagnifyingGlass />
              </SearchIcon>
              <CancleIcon onClick={() => setValue('query', '')}>
                <SmallX />
              </CancleIcon>
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
        {keywords.length === 0 ? (
          <NoRecentSearchResult>
            <BigSearch />
            <p>최근검색어가 없습니다.</p>
          </NoRecentSearchResult>
        ) : (
          <RecentKeywordContainer>
            <h2>최근검색어</h2>
            {keywords.map((keyword) => (
              <RecentKeywordInnerContainer key={keyword.id}>
                <div>{keyword.text}</div>
                <div onClick={() => handleRemoveKeyword(keyword.id)}>
                  <SmallX />
                </div>
              </RecentKeywordInnerContainer>
            ))}
          </RecentKeywordContainer>
        )}
        <SearchResultContainer>
          <ReviewList
            title={'최신글'}
            reviews={reviews}
            isLoading={false}
            text={'찾으시는 검색결과가 없습니다.'}
          />
        </SearchResultContainer>
      </Container>
    </Layout>
  );
}

const Container = styled.div``;

const SearchResultContainer = styled.div``;

const RecentKeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 15px;
  h2 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const RecentKeywordInnerContainer = styled.div`
  padding: 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
`;

const NoRecentSearchResult = styled.div`
  padding-top: 25vh;
  text-align: center;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
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

const CancleIcon = styled.div`
  fill: ${({ theme }) => theme.buttonScheme.disabled};
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

export default Search;
