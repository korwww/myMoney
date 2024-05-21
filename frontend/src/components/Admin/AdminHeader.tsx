import styled from 'styled-components';

import Button from '../common/Button';
import { useAuth } from '@/hooks/useAuth';

function AdminHeader() {
  const { userLogout } = useAuth();
  return (
    <Header>
      <h4>관리자 페이지</h4>
      <Button scheme="primary" size="small" onClick={userLogout}>
        로그아웃
      </Button>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #a0a19c;
  padding: 0 15px;
  h4 {
    color: #fff;
  }
  button {
    height: 30px;
    background-color: ${({ theme }) => theme.color.darkGray};
  }
`;

export default AdminHeader;
