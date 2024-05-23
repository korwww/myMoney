import styled from 'styled-components';

import NoRecentSearchResult from './NoRecentSearchResult';
import { IRecentKeywordKey, RecentKeywordCancelIcon } from '@/pages/Search';
import { SmallX } from '@/assets/icons/SmallX';

interface IRecentKeywordProps {
  keywords: IRecentKeywordKey[];
  handleRemoveRecentKeyword: (id: number) => void;
  handleClearRecentKeywords: () => void;
  handleRecentKeywordClick: (text: string) => void;
}

function RecentKeyword({
  keywords,
  handleRemoveRecentKeyword,
  handleClearRecentKeywords,
  handleRecentKeywordClick,
}: IRecentKeywordProps) {
  if (keywords.length === 0)
    return <NoRecentSearchResult text="최근 검색어가 없습니다." />;
  return (
    <RecentKeywordContainer>
      <div className="SearchClearKeyword">
        <h2>최근검색어</h2>
        {keywords.length ? (
          <ClearAllButton type="button" onClick={handleClearRecentKeywords}>
            전체 삭제
          </ClearAllButton>
        ) : null}
      </div>

      {keywords.map(({ id, text }) => (
        <RecentKeywordInnerContainer
          key={id}
          onClick={() => handleRecentKeywordClick(text)}
        >
          <div className="RecentKeywordItem">{text}</div>
          <RecentKeywordCancelIcon
            onClick={(event) => {
              event.stopPropagation();
              handleRemoveRecentKeyword(id);
            }}
          >
            <SmallX />
          </RecentKeywordCancelIcon>
        </RecentKeywordInnerContainer>
      ))}
    </RecentKeywordContainer>
  );
}

const RecentKeywordInnerContainer = styled.div`
  padding: 19px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
`;

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

const ClearAllButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.border};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default RecentKeyword;
