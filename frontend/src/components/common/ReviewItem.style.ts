import styled from 'styled-components';

export const Container = styled.article`
  padding: 14px 0;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 4px;
  .name {
    font-size: ${({ theme }) => theme.text['medium'].fontSize};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }
  .date {
    font-size: ${({ theme }) => theme.text['small'].fontSize};
    color: ${({ theme }) => theme.color.border};
  }
  ul {
    li {
      a {
        text-decoration: none;
      }
    }
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 219.375px;
  background-color: ${({ theme }) => theme.color.background};
  margin-bottom: 14px;
  border-radius: 10px;
  overflow: hidden;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    p {
      color: ${({ theme }) => theme.color.darkGrey};
      font-size: ${({ theme }) => theme.text['small'].fontSize};
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 6px;
  padding: 0 16px;
  margin-bottom: 8px;
  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    .title {
      width: 100%;
      font-size: ${({ theme }) => theme.heading['small'].fontSize};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      text-overflow: inherit;
      white-space: inherit;
      overflow: inherit;
    }
  }
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 10px;
  font-size: 10px;
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  .badgeImg {
    height: 12px;
  }
`;

export const Content = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: 3em;
  padding: 0 16px;
  margin-bottom: 14px;
`;

export const LikesContainer = styled.div`
  padding: 0 16px;
  p {
    font-size: ${({ theme }) => theme.text['small'].fontSize};
  }
`;
