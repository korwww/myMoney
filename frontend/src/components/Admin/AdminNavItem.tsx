import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../common/Icon';

export interface AdminNavItemProps {
  icon: JSX.Element;
  name: string;
  path: string;
  $iconSize?: number;
  isActive?: boolean;
}

function AdminNavItem({
  isActive = false,
  icon,
  name,
  path,
  $iconSize,
}: AdminNavItemProps) {
  return (
    <NavItem to={path} className={isActive ? 'active' : ''}>
      <Icon fill="#fff" icon={icon} width={20} $iconSize={$iconSize} />
      <Title>{name}</Title>
    </NavItem>
  );
}

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 40px;
  padding: 10px 20px;
  text-decoration: none;
  transition: all 0.3s;
  &.active,
  &:hover {
    background-color: #4d9349;
  }
`;

const Title = styled.h4`
  color: #fff;
  font-size: ${({ theme }) => theme.text['medium'].fontSize};
`;

export default AdminNavItem;
