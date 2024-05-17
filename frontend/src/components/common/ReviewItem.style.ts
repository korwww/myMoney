import styled from 'styled-components';

export const Container = styled.article`
  padding: 14px 16px;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  min-height: 160px;
  max-height: 205px;
  margin-bottom: 14px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.background};
  a {
    text-decoration: none;
    p {
      color: ${({ theme }) => theme.color.darkGrey};
      font-size: ${({ theme }) => theme.text['small'].fontSize};
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 6px;
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
  margin-bottom: 14px;
`;

export const LikesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .review-helpful-count {
    font-size: ${({ theme }) => theme.text['small'].fontSize};
  }
`;

export const LikeButton = styled.div`
  cursor: pointer;
  &.liked {
    svg {
      fill: ${({ theme }) => theme.color.danger};
      path {
        fill: inherit;
      }
    }
  }
`;
