import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { User } from '@/assets/icons/User.tsx';
import { MagnifyingGlass } from '@/assets/icons/MagnifyingGlass.tsx';
import { Plus } from '@/assets/icons/Plus.tsx';
import { Archive } from '@/assets/icons/Archive.tsx';
import { House } from '@/assets/icons/House';

interface NavItem {
  text?: string;
  path: string;
  icon: React.ReactNode;
}

export default function Navigation() {
  const NAV_ITEMS: NavItem[] = [
    {
      text: '홈',
      path: '/',
      icon: <House />,
    },
    {
      text: '목록',
      path: '/list',
      icon: <Archive />,
    },
    {
      path: '/review',
      icon: <Plus />,
    },
    {
      text: '검색',
      path: '/search',
      icon: <MagnifyingGlass />,
    },
    {
      text: '마이',
      path: '/mypage',
      icon: <User />,
    },
  ];

  return (
    <NavStyle>
      {NAV_ITEMS.map((item, index) => (
        <NavItem
          key={item.path}
          to={item.path}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <Icon className={index === 2 ? 'greenBg' : ''}>{item.icon}</Icon>
          {item.text && <p>{item.text}</p>}
        </NavItem>
      ))}
    </NavStyle>
  );
}

const NavStyle = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 390px;
  height: 85px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;

  p {
    font-size: 10px;
    color: ${({ theme }) => theme.color.darkGray};
  }
  /* active 스타일 */
  &.active {
    svg {
      fill: ${({ theme }) => theme.color.primary};
    }
    p {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

const Icon = styled.div`
  svg {
    width: 25px;
    height: 25px;
    fill: ${({ theme }) => theme.color.darkGray};
    path {
      fill: inherit;
    }
  }
  /* 플러스 버튼 스타일 */
  &.greenBg {
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.primary};
    align-items: center;
    justify-content: center;

    svg {
      width: 32px;
      height: 32px;
      fill: #ffffff;
    }
  }
`;
