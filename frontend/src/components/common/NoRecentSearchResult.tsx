import { BigSearch } from '@/assets/icons/BigSearch';
import styled from 'styled-components';

interface NoRecentSearchResultProps {
  text: string;
}

function NoRecentSearchResult({ text }: NoRecentSearchResultProps) {
  return (
    <NoRecentSearchResultStyle>
      <BigSearch />
      <p>{text}</p>
    </NoRecentSearchResultStyle>
  );
}

const NoRecentSearchResultStyle = styled.div`
  padding-top: 25vh;
  text-align: center;
`;

export default NoRecentSearchResult;
