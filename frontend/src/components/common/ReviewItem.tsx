import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Icon from './Icon';
import Dropdown from './Dropdown';
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
import { IReviewItem } from '@/models/review.model';

function ReviewItem({
  title,
  createdAt,
  userName,
  content,
  verified,
  reviewImg,
  likes,
  id,
  userId,
  isLiked,
  isMyReview,
}: IReviewItem) {
  const toggleLiked = () => {
    // 좋아요 누르기, 취소 기능 추가
  };

  const stripHtmlTags = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const formatDate = (date: string) => {
    return dayjs(date).format('YYYY.MM.DD');
  };

  return (
    <Container>
      <InfoContainer>
        <div>
          <h4 className="name">{userName}</h4>
          <p className="date">{formatDate(createdAt)}</p>
        </div>
        <Dropdown
          toggleButton={<DotsThree />}
          $positionLnR="left"
          $positionValue={-30}
          $positionTopValue={32}
          $width={100}
        >
          <ul>
            {isMyReview ? (
              <>
                <li>
                  <Link to={`/review/${id}`}>수정하기</Link>
                </li>
                <li>삭제하기</li>
              </>
            ) : (
              <li>신고하기</li>
            )}
          </ul>
        </Dropdown>
      </InfoContainer>

      <ImgContainer>
        <Link to={`/list/${id}`}>
          {reviewImg ? (
            <>
              <img src={reviewImg} alt={title} />
            </>
          ) : (
            <p>등록된 이미지가 없습니다.</p>
          )}
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

      <Content>{stripHtmlTags(content)}</Content>

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
