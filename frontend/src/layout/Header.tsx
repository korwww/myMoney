import styled from 'styled-components';

import { CaretLeft } from '@/assets/icons/CaretLeft';
import { TextLogo } from '@/assets/icons/textLogo';
import { handleGoAdmin, handleGoBack } from '@/utils/routingUtils';
import useAuthStore from '@/store/auth.store';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  className?: string;
}

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const { isAdminUser } = useAuthStore();
  return (
    <Container>
      {showBackButton && (
        <BackIcon onClick={handleGoBack}>
          <CaretLeft />
        </BackIcon>
      )}

      {title ? (
        <h2>{title}</h2>
      ) : (
        <Icon>
          <TextLogo />
        </Icon>
      )}
      {isAdminUser && (
        <GoToAdminButton onClick={handleGoAdmin}>
          <span role="button">관리</span>
        </GoToAdminButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};
  position: relative;
  background-color: white;
`;

const Icon = styled.div`
  svg {
    path {
      fill: ${({ theme }) => theme.color.primary};
    }
  }
  margin-top: 10px;
`;

const BackIcon = styled.div`
  position: absolute;
  left: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const GoToAdminButton = styled.div`
  position: absolute;
  right: 16px;
  color: ${({ theme }) => theme.color.darkGray};
  font-size: ${({ theme }) => theme.text['medium'].fontSize};
  cursor: pointer;
`;
