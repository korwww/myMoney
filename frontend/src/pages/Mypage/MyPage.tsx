import React from 'react';
import styled from 'styled-components';
import Layout from '@/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Archive } from '@/api/assets/icons/Archive';
import { Baby } from '@/api/assets/icons/Baby';
import { Heart } from '@/api/assets/icons/Heart';
import { Question } from '@/api/assets/icons/Question';
import { SignOut } from '@/api/assets/icons/SignOut';
import { Siren } from '@/api/assets/icons/Siren';
import { useUser } from '@/hooks/useUser';
import { withAuthenticatedUser } from '@/components/hocs/withAuthenticatedUser';
import Loading from '@/components/common/Loading';
import { LoadingContainer } from '@/components/Admin/AdminContent';

function MyPage() {
  const navigate = useNavigate();
  const { userLogout } = useAuth();
  const { userInfo, isLoadingUsers } = useUser();

  const handleMyReviewsClick = () => {
    navigate('reviews');
  };

  const handleLikedReviewsClick = () => {
    navigate('liked');
  };

  const handleSignOutClick = () => {
    userLogout();
  };

  return (
    <Layout showBackButton={true} title="마이페이지">
      {isLoadingUsers ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <Container>
          <div className="userContainer">
            <span>{userInfo.nickname}</span>
            <p>{userInfo.email}</p>
          </div>
          <ItemContainer className="ItemContainer">
            <Siren />
            <ReportIcon style={{ color: 'red' }}>
              신고당한 횟수: {userInfo.reportCount}회
            </ReportIcon>
          </ItemContainer>
          <ItemContainer onClick={() => alert('준비 중인 서비스입니다.')}>
            <Baby />
            <StyledIcon>내 정보 관리</StyledIcon>
          </ItemContainer>
          <ItemContainer onClick={handleMyReviewsClick}>
            <Archive />
            <StyledIcon>내가 작성한 리뷰 목록</StyledIcon>
          </ItemContainer>
          <ItemContainer onClick={handleLikedReviewsClick}>
            <Heart />
            <StyledIcon>좋아요 누른 리뷰 목록</StyledIcon>
          </ItemContainer>
          <ItemContainer onClick={() => alert('준비 중인 서비스입니다.')}>
            <Question />
            <StyledIcon>고객센터</StyledIcon>
          </ItemContainer>
          <ItemContainer onClick={handleSignOutClick}>
            <SignOut />
            <StyledIcon>로그아웃</StyledIcon>
          </ItemContainer>
        </Container>
      )}
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .userContainer {
    padding: 31px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    span {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
    p {
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    }
  }
  .ItemContainer {
    margin-top: 50px;
  }
`;
const ItemContainer = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ReportIcon = styled.div`
  margin-left: 8px;
`;

const StyledIcon = styled.p`
  cursor: pointer;
  margin-left: 8px;
`;

export default withAuthenticatedUser(MyPage);

// 조건문을 사용해서 isLoading일때는 로딩 화면 보여주고 아니면 컨테이너를 보여주자!

// import { MagnifyingGlass } from '@/api/assets/icons/MagnifyingGlass';
// import Layout from '@/layout/Layout';
// import styled from 'styled-components';

// function MyPage() {
//   const recentSearchword = ['abc', 'def'];
//   return (
//     <Layout showBackButton={true} title="마이페이지">
//       <Fieldset className="인풋박스를 감쌀 친구">
//         <SearchIcon className="검색 아이콘을 감쌀 친구">
//           <MagnifyingGlass />
//         </SearchIcon>
//         <input />
//       </Fieldset>
//     </Layout>
//   );
// }

// const Fieldset = styled.fieldset`
//   position: relative;
//   input {
//     padding-left: 40px;
//   }
// `;
// const SearchIcon = styled.div`
//   position: absolute;
// `;
// export default MyPage;
