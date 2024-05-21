import { Link } from 'react-router-dom';

import Dropdown from './Dropdown';
import { DotsThree } from '@/assets/icons/DotsThree';
import BadgeImg from '@/assets/images/badge-img.png';
import {
  Badge,
  Container,
  Content,
  ImgContainer,
  LikesContainer,
  TitleContainer,
  InfoContainer,
} from './ReviewItem.style';
import { IReviewItem } from '@/models/review.model';
import Like from '../Review/Like';
import { useLike } from '@/hooks/useLike';
import { formatDate } from '@/utils/format';

function ReviewItem({
  title,
  createdAt,
  userName,
  content,
  verified,
  reviewImg,
  likes,
  id,
  isLiked,
  isMyReview,
}: IReviewItem) {
  const { likeToggle, localIsLiked, localLikes } = useLike({
    reviewId: id,
    isLikedDB: isLiked,
    likesDB: likes,
  });

  const stripHtmlTags = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
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
          $positionLnR="right"
          $positionValue={0}
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
        <Like isLiked={localIsLiked} likes={localLikes} onClick={likeToggle} />
      </LikesContainer>
    </Container>
  );
}

export default ReviewItem;
