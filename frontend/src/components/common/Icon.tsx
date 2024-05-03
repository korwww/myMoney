import styled from 'styled-components';

interface IconProps {
  size: number;
  icon: JSX.Element;
}

function Icon({ size, icon }: IconProps) {
  return <IconStyle size={size}>{icon}</IconStyle>;
}

const IconStyle = styled.div<{ size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
  }
`;

export default Icon;
