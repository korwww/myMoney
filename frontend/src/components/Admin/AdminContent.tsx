import React from 'react';
import styled from 'styled-components';

interface AdminContentProps {
  title: string;
  children: React.ReactNode;
}

function AdminContent({ title, children }: AdminContentProps) {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
}

const Container = styled.div`
  padding: 30px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.heading['large'].fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export default AdminContent;
