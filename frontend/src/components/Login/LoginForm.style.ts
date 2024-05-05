import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const InputGroup = styled.div<{ $isUserLoginPage: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: ${({ $isUserLoginPage }) =>
    !$isUserLoginPage ? '26px' : '6px'};
  input {
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: ${({ theme }) => theme.text['medium'].fontSize};
    &:focus {
      outline: none;
      border: 1px solid ${({ theme }) => theme.color.primary};
    }
  }
`;

export const FormStyle = styled.form`
  margin-bottom: 50px;
`;

export const OptionStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 27px;
  font-size: ${({ theme }) => theme.text['small'].fontSize};
`;

export const IDCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.color.darkGray};
`;

export const FindPassword = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.darkGray};
`;
