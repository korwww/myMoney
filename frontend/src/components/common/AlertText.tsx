import styled from 'styled-components';

import { FontSize } from '@/style/theme';

interface AlertTextProps {
  children: React.ReactNode;
  size: FontSize;
}
function AlertText({ children, size }: AlertTextProps) {
  return <AlertTextStyle size={size}>{children}</AlertTextStyle>;
}
const AlertTextStyle = styled.p<Pick<AlertTextProps, 'size'>>`
  padding-top: 4px;
  color: ${({ theme }) => theme.color.danger};
  font-size: ${({ theme, size }) => theme.text[size].fontSize};
`;
export default AlertText;
