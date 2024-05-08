import React from 'react';
import styled from 'styled-components';
import { ButtonScheme, ButtonSize } from '@/style/theme';

// 버튼 컴포넌트 Props 정의
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // 버튼 내용
  size: ButtonSize; // 버튼 크기 (large, medium, small)
  scheme: ButtonScheme; // 버튼 테마 (primary, disabled, transparent, border)
  disabled?: boolean; // 비활성화 여부
  isLoading?: boolean; // 로딩 상태 여부
  $fullWidth?: boolean;
}

// 버튼 컴포넌트 정의
export default function Button({
  children,
  size,
  scheme,
  disabled,
  isLoading,
  $fullWidth = false,
  ...props
}: Props) {
  return (
    <ButtonStyle
      size={size}
      scheme={scheme}
      disabled={disabled}
      isLoading={isLoading}
      $fullWidth={$fullWidth}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
}

// 버튼 스타일 정의
const ButtonStyle = styled.button<Omit<Props, 'children'>>`
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  // 버튼 텍스트 스타일
  font-size: ${({ theme, size }) => theme.button[size].fontSize};

  // 버튼 여백 스타일
  padding: ${({ theme, size }) => theme.button[size].padding};

  // 버튼 배경 및 테두리 스타일
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, disabled, scheme }) =>
    disabled
      ? theme.buttonScheme['disabled'].backgroundColor
      : theme.buttonScheme[scheme].backgroundColor};
  border: ${({ scheme, theme }) =>
    scheme === 'border'
      ? `1px solid ${theme.buttonScheme[scheme].border}`
      : 'none'};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  // 비활성화된 버튼은 이벤트 차단
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  // 비활성화된 버튼은 마우스 커서 변경
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  // 로딩 중인 경우에 대한 스타일 추가
  // isLoading 속성에 따라 스타일을 변경할 수 있음
  // 버튼 비활성화 스타일
  &:disabled {
    cursor: not-allowed; // 마우스 커서 변경
  }

  // 자연스럽게 색상 변경되도록 설정
  transition: all 0.3s ease-in-out;

  // hover 효과 스타일
  &:hover {
    opacity: 0.8;
  }
`;
