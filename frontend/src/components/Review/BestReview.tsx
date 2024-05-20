import styled from 'styled-components';
import { Badge } from '@/components/common/ReviewItem.style';
import BadgeImg from '@/assets/images/badge-img.png';
import { Star } from '@/assets/icons/Star';
import { useState } from 'react';

interface Props {
  img?: string;
  isVerified?: boolean;
  title?: string;
  userName?: string;
  stars?: number;
  page?: string;
}

const SCORE = [0, 1, 2, 3, 4];

function BestReview({ img, isVerified, title, userName, stars, page }: Props) {
  const [score, setScore] = useState([false, false, false, false, false]);

  return (
    <BestReviewStyle>
      <div className="wrapTop">
        <div className="badge">
          <BadgeStyle>Best</BadgeStyle>
          {isVerified && (
            <BadgeStyle>
              <img className="badgeImg" src={BadgeImg} alt="인증마크" />
              인증
            </BadgeStyle>
          )}
        </div>
      </div>
      <img src={img} />
      <div className="wrapBottom">
        <div className="title">{title}</div>
        <div className="userName">{userName}</div>
        <div className="wrapFlex">
          <div className="stars">
            {SCORE.map(() => (
              <Star />
            ))}
          </div>
          {page}
        </div>
      </div>
    </BestReviewStyle>
  );
}

const BestReviewStyle = styled.div`
  width: 390px;
  height: 350px;

  .wrapTop {
    position: absolute;
    z-index: 15;
    width: 100%;
    background-image: linear-gradient(
      to bottom,
      #454545,
      rgba(255, 255, 255, 0)
    );
    height: 50px;

    padding: 8px;

    .badge {
      display: flex;
      gap: 6px;
    }
  }

  .wrapBottom {
    padding: 40px 20px 0px 20px;
    color: white;
    position: relative;
    z-index: 15;
    width: 100%;
    background-image: linear-gradient(to top, #454545, rgba(255, 255, 255, 0));
    height: 150px;
    bottom: 150px;
  }

  .title {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.heading.large.fontSize};
  }

  .userName {
    font-size: ${({ theme }) => theme.text.medium.fontSize};
  }

  .wrapFlex {
    display: flex;
    justify-content: space-between;

    .stars {
      svg {
        width: 16px;
        height: 16px;
      }
      path {
        fill: #ffffff;
      }
    }
  }

  img {
    height: 350px;
    object-fit: cover;
  }
`;

const BadgeStyle = styled(Badge)`
  width: 75px;
  height: 25px;
  background-color: ${({ theme }) => theme.color.primary};
  color: white;
  font-size: 15px;

  .badgeImg {
    height: 22px;
  }
`;

export default BestReview;
