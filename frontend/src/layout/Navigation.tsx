import { Link, useLocation } from 'react-router-dom';
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
      path: '/create',
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

  const location = useLocation();
  
  return (
    <NavStyle>
      <div className="navigation">
        {NAV_ITEMS.map((item, index) => (
          <Link key={item.path} to={item.path}>
            <Icon
              className={
                index === 2
                  ? 'greenBg'
                  : location.pathname === item.path
                    ? 'active'
                    : ''
              }
            >
              {item.icon}
            </Icon>
            {item.text && <span>{item.text}</span>}
          </Link>
        ))}
      </div>
    </NavStyle>
  );
}

const NavStyle = styled.div`
  .navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 85px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: white;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      cursor: pointer;

      span {
        font-size: 10px;
        color: ${({ theme }) => theme.color.darkGray};
      }
    }
  }

  .greenBg {
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
      path {
        fill: #ffffff;
      }
    }
  }
`;

const Icon = styled.div`
  display: flex;
  &.active {
    color: ${({ theme }) => theme.color.primary};

    svg {
      path {
        fill: ${({ theme }) => theme.color.primary};
      }
    }
  }

  svg {
    width: 25px;
    height: 25px;
  }
`;
