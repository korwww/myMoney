import styled from 'styled-components';

interface IconProps {
  width: number;
  height?: number;
  icon: JSX.Element;
  fill?: string;
  $iconSize?: number;
}

function Icon({ width, height, icon, fill, $iconSize }: IconProps) {
  return (
    <IconStyle width={width} height={height} fill={fill} $iconSize={$iconSize}>
      {icon}
    </IconStyle>
  );
}

const IconStyle = styled.div<Omit<IconProps, 'icon'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ width, height }) => (height ? height : width)}px;
  svg {
    width: ${({ $iconSize }) => ($iconSize ? `${$iconSize}px` : 'inherit')};
    height: ${({ $iconSize }) => ($iconSize ? `${$iconSize}px` : 'inherit')};
    fill: ${({ theme, fill }) => (fill ? fill : theme.color.darkGray)};
    transition: all 0.3s;
    path {
      fill: inherit;
    }
  }
`;

export default Icon;
