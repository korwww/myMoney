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
import { useReviews } from '@/hooks/useReviews';
import { useState } from 'react';
import Modal from './Modal';
import {
  MODAL_BTNTEXT,
  MODAL_TITLE,
  MODAL_TYPES,
} from '@/constance/modalString';
import { useAuth } from '@/hooks/useAuth';
import useAuthStore from '@/store/auth.store';
import { handleGoLogin } from '@/utils/routingUtils';

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
  userId,
  isMyReview,
}: IReviewItem) {
  const { postReport, deleteReviewInReviews } = useReviews();
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const { isLoggedIn } = useAuthStore();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReportClick = () => {
    if (!isLoggedIn) {
      setModalType(MODAL_TYPES.LOGIN);
      setIsModalOpen(true);
      return;
    }
    setModalType(MODAL_TYPES.REPORT);
    openModal();
  };

  const handleConfirm = (option: string) => {
    if (modalType === MODAL_TYPES.LOGIN) {
      handleGoLogin();
    }
    postReport({ reason: option, reportedUserId: userId });

    closeModal();
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
                <li onClick={() => deleteReviewInReviews(id)}>삭제하기</li>
              </>
            ) : (
              <li onClick={handleReportClick}>신고하기</li>
            )}
          </ul>
        </Dropdown>
      </InfoContainer>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalType === MODAL_TYPES.LOGIN
            ? MODAL_TITLE.LOGIN
            : MODAL_TITLE.REPORT
        }
        buttonText={
          modalType === MODAL_TYPES.LOGIN
            ? MODAL_BTNTEXT.LOGIN
            : MODAL_BTNTEXT.REPORT
        }
        report={modalType === MODAL_TYPES.REPORT}
        onConfirm={handleConfirm}
      />

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
        {Boolean(verified) && (
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
