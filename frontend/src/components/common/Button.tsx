import React from 'react';
import styled from 'styled-components';
import { ButtonScheme, ButtonSize } from '@/style/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
  $fullWidth?: boolean;
}

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

const ButtonStyle = styled.button<Omit<Props, 'children'>>`
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  font-size: ${({ theme, size }) => theme.button[size].fontSize};

  padding: ${({ theme, size }) => theme.button[size].padding};

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

  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:disabled {
    cursor: not-allowed;
  }

  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;
