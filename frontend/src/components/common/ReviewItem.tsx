import Icon from './Icon';
import { DotsThree } from '@/assets/icons/DotsThree';
import { Heart } from '@/assets/icons/Heart';
import BadgeImg from '@/assets/images/badge-img.png';
import {
  Badge,
  Container,
  Content,
  ImgContainer,
  LikeButton,
  LikesContainer,
  TitleContainer,
  InfoContainer,
} from './ReviewItem.style';
import { Link } from 'react-router-dom';
import { IReviewItem } from '@/models/review.model';

function ReviewItem({
  title,
  createdAt,
  userName,
  content,
  verified,
  imgSrc,
  likes,
  id,
  userId,
  isLiked,
  isOwner,
}: IReviewItem) {
  const toggleLiked = () => {
    // 좋아요 누르기, 취소 기능 추가
  };
  return (
    <Container>
      <InfoContainer>
        <div>
          <h4 className="name">{userName}</h4>
          <p className="date">{createdAt}</p>
        </div>
        <div role="button" className="action-button">
          <Icon width={24} icon={<DotsThree />} />
        </div>
      </InfoContainer>

      <ImgContainer>
        <Link to={`/list/${id}`}>
          <img src={imgSrc} alt={title} />
        </Link>
      </ImgContainer>

      <TitleContainer>
        <Link to={`/list/${id}`}>
          <h4 className="title">{title}</h4>
        </Link>
        {verified && (
          <Badge>
            <img className="badgeImg" src={BadgeImg} alt="인증마크" />
            인증
          </Badge>
        )}
      </TitleContainer>

      <Content>{content}</Content>

      <LikesContainer>
        <p className="review-helpful-count">
          {likes}명에게 도움이 된 리뷰예요.
        </p>
        <LikeButton
          role="button"
          onClick={toggleLiked}
          className={isLiked ? 'liked' : ''}
        >
          <Icon width={20} icon={<Heart />} />
        </LikeButton>
      </LikesContainer>
    </Container>
  );
}

export default ReviewItem;
