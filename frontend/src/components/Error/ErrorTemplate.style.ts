import styled from 'styled-components';

export const ErrorContainer = styled.div<{ $errorStatus: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 390px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .error-status {
    margin-bottom: 38px;
    color: ${({ theme }) => theme.color.disabled};
    font-size: ${({ theme }) => theme.text.large.fontSize};
  }

  .title {
    padding-top: ${({ $errorStatus }) => ($errorStatus ? '0px' : '25px')};
    font-size: ${({ theme }) => theme.heading.medium.fontSize};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-bottom: 12px;
  }

  .content {
    text-align: center;
    font-size: ${({ theme }) => theme.text.medium.fontSize};
    color: ${({ theme }) => theme.color.border};
    line-height: 1.2;
  }
`;

export const ButtonContainer = styled.div<{ length: number }>`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  margin-top: 55px;
  button {
    width: ${({ length }) => `calc(100% / ${length})`};
    font-size: ${({ theme }) => theme.heading['small'].fontSize};
  }
`;
