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

function MyPage() {
  const navigate = useNavigate();
  const { userLogout } = useAuth();

  const handleMyReviewsClick = () => {
    navigate('/reviews?myReviews=true');
  };

  const handleLikedReviewsClick = () => {
    navigate('/reviews?liked=true');
  };

  const handleSignOutClick = () => {
    userLogout();
    navigate('/');
  };

  return (
    <Layout showBackButton={true} title="마이페이지">
      <Container>
        <ItemContainer>
          <Siren />
          <StyledIcon style={{ color: 'red' }}>신고당한 횟수: 회</StyledIcon>
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
    </Layout>
  );
}

// 스타일 컴포넌트 정의
const Container = styled.div`
  margin-top: 90px;
`;

const ItemContainer = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledIcon = styled.p`
  cursor: pointer;
  margin-left: 8px;
`;

export default MyPage;
