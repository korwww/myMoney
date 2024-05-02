import styled from 'styled-components';

function Home() {
  return (
    <div>
      <p>기본 굵기</p>
      <SemiBoldText>600 굵기</SemiBoldText>
      <BoldText>700 굵기</BoldText>
    </div>
  );
}

const SemiBoldText = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;
const BoldText = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default Home;
