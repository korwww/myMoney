import styled from 'styled-components';

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.heading.medium.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Container = styled.section`
  padding: ${({ theme }) => theme.padding.mainContent};
  border-bottom: 1px solid ${({ theme }) => theme.color.disabled};
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 8px;
  .title {
    font-size: ${({ theme }) => theme.heading['medium'].fontSize};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    white-space: normal;
    line-height: 1.4;
  }
`;

export const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0;

  .nickname {
    padding-top: 3px;
    font-size: ${({ theme }) => theme.text.large.fontSize};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.text.small.fontSize};
    color: ${({ theme }) => theme.color.darkGray};

    > div:hover {
      color: ${({ theme }) => theme.color.secondary};
      svg {
        fill: ${({ theme }) => theme.color.secondary};
      }
    }

    span {
      font-size: ${({ theme }) => theme.text.small.fontSize};
      color: ${({ theme }) => theme.color.darkGray};
    }
  }
`;

export const ReviewInfo = styled.div`
  color: ${({ theme }) => theme.color.border};
  margin: 5px 0;
  font-size: ${({ theme }) => theme.text.medium.fontSize};
  margin-bottom: 10px;

  a {
    margin-right: 10px;
  }
`;

export const Content = styled.div`
  padding: 10px 0;
  line-height: 1.5;
`;
