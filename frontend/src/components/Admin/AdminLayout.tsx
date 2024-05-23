import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import styled from 'styled-components';
import Icon from '../common/Icon';
import { Attention } from '@/assets/icons/Attention';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  const [isTabletSize, setIsTabletSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletSize(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isTabletSize)
    return (
      <AlertContainer>
        <Icon icon={<Attention />} width={90} fill="#ffc807" />
        <p>
          화면의 크기가 너무 작습니다.
          <br />
          화면의 크기를 키우거나, PC에서 접속해주세요.
        </p>
      </AlertContainer>
    );

  return (
    <Container>
      <AdminSidebar />
      <AdminMainContent id="admin-main">
        <AdminHeader />
        {children}
      </AdminMainContent>
    </Container>
  );
}
const AlertContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  p {
    padding-top: 40px;
    text-align: center;
  }
`;

const Container = styled.div`
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  margin: 0 auto;
`;

const AdminMainContent = styled.section`
  padding-left: 230px;
`;

export default AdminLayout;
