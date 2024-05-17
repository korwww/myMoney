import React from 'react';
import styled from 'styled-components';
import Loading from '../common/Loading';

interface AdminContentProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

function AdminContent({ title, children, isLoading }: AdminContentProps) {
  return (
    <Container>
      <Title>{title}</Title>
      {isLoading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <>{children}</>
      )}
    </Container>
  );
}
export const LoadingContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.heading['large'].fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export default AdminContent;
