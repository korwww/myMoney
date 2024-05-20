import styled from 'styled-components';
import { Badge } from '@/components/common/ReviewItem.style';
import BadgeImg from '@/assets/images/badge-img.png';
import { Star } from '@/assets/icons/Star';
import { LightStar } from '@/assets/icons/LightStar';

interface Props {
  img?: string;
  isVerified?: boolean;
  title?: string;
  userName?: string;
  stars?: number;
  page?: string;
}

function BestReview({
  img,
  isVerified,
  title,
  userName,
  stars = 0,
  page,
}: Props) {
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
      <img className="img" src={img} />
      <div className="wrapBottom">
        <div className="title">{title}</div>
        <div className="userName">{userName}</div>
        <div className="wrapFlex">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((e, index) =>
              e <= stars ? (
                <LightStar key={`light-star-${index}`} />
              ) : (
                <Star key={`star-${index}`} />
              ),
            )}
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

  .img {
    height: 350px;
    object-fit: cover;
  }

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
    margin-top: 10px;

    .stars {
      display: flex;
    }
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