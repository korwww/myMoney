import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import styled from 'styled-components';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
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
const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
`;

const AdminMainContent = styled.section`
  flex: 1;
`;

export default AdminLayout;
