import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface AuthOptionsProps {
  description: string;
  linkText: string;
  linkPath: string;
}

function AuthOptions({ description, linkText, linkPath }: AuthOptionsProps) {
  return (
    <AuthOptionsStyle>
      <p>{description}</p>
      <Link to={linkPath}>{linkText}</Link>
    </AuthOptionsStyle>
  );
}

const AuthOptionsStyle = styled.div`
  display: flex;
  gap: 4px;
  color: ${({ theme }) => theme.color.darkGray};
  font-size: ${({ theme }) => theme.text['small'].fontSize};
  p {
    opacity: 0.8;
  }
  a {
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }
`;

export default AuthOptions;
