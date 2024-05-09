import styled from 'styled-components';

export const InputGroup = styled.div<{ $isUserLoginPage: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: ${({ $isUserLoginPage }) =>
    !$isUserLoginPage ? '26px' : '6px'};
`;

export const FormStyle = styled.form`
  margin-bottom: 50px;
`;

export const OptionStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 27px;
  font-size: ${({ theme }) => theme.text['small'].fontSize};
`;

export const IDCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.color.darkGray};
  cursor: pointer;
`;

export const FindPassword = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.color.darkGray};
  cursor: pointer;
`;
