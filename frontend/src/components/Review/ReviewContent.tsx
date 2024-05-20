import Icon from '../common/Icon';
import Like from './Like';
import { Siren } from '@/assets/icons/Siren';
import { IReviewDetail } from '@/models/review.model';
import { AiFillStar } from 'react-icons/ai';
import { useReviewDetail } from '@/hooks/useReviewDetail';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '../common/ReviewItem.style';
import BadgeImg from '@/assets/images/badge-img.png';
import {
  Container,
  TitleContainer,
  ReviewInfo,
  Content,
  AuthorContainer,
} from './ReviewContent.style';
import { formatDate } from '@/utils/format';
import { PencilSimple } from '@/assets/icons/PencilSimple';
import { Trash } from '@/assets/icons/Trash';
import useAuthStore from '@/store/auth.store';
import Modal from '../common/Modal';
import { useState } from 'react';

export interface Props {
  reviewId?: string;
}

const Stars = (props: Pick<IReviewDetail, 'stars'>) => {
  return (
    <div className="star">
      {Array.from({ length: 5 }, (_, index) => (
        <AiFillStar
          size={20}
          key={index}
          style={{ color: index < props.stars ? '#ffe600' : '#d9d9d9' }}
        />
      ))}
    </div>
  );
};

interface BtnProps {
  className: string;
  icon: React.ReactElement;
  label?: string;
  onClick: () => void;
}

const Btn: React.FC<BtnProps> = ({ className, icon, label, onClick }) => {
  return (
    <div className={className} role="button" onClick={onClick}>
      <Icon width={20} height={20} icon={icon} />
      {label}
    </div>
  );
};

function ReviewContent({ reviewId }: Props) {
  const { review, likeToggle, deleteToggle, reportToggle } =
    useReviewDetail(reviewId);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  if (!review) return null;

  const handleUpdateClick = () => {
    if (!isLoggedIn) {
      window.alert('로그인이 필요합니다.');
      return;
    }
    navigate(`/list/${reviewId}`);
  };

  const handleConfirmAction = () => {
    if (modalType === 'delete') {
      deleteToggle();
    }
    if (modalType === 'report') {
      reportToggle();
    }
    setIsOpen(false);
  };
  review.isAuthor = false;

  return (
    <Container>
      <AuthorContainer>
        <h3 className="nickname">{review.name}</h3>
        {review.isAuthor ? (
          <div className="btn">
            <Btn
              className="updateBtn"
              icon={<PencilSimple />}
              onClick={handleUpdateClick}
            />
            <Btn
              className="deleteBtn"
              icon={<Trash />}
              onClick={() => {
                setModalType('delete');
                setIsOpen(true);
              }}
            />
          </div>
        ) : (
          <Btn
            className="reportBtn btn"
            icon={<Siren />}
            onClick={() => {
              setModalType('report');
              setIsOpen(true);
            }}
            label="신고하기"
          />
        )}
      </AuthorContainer>

      <Modal
        isOpen={isOpen}
        title={
          modalType === 'delete'
            ? '리뷰를 정말로 삭제하시겠어요?'
            : '리뷰 작성자를 신고하시겠어요?'
        }
        buttonText={modalType === 'delete' ? '삭제' : '신고'}
        report={modalType === 'delete' ? false : true}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmAction}
      />

      <TitleContainer>
        <h2 className="title">{review.title}</h2>
        {review.verified === 1 && (
          <Badge>
            <img className="badgeImg" src={BadgeImg} alt="인증마크" />
            인증
          </Badge>
        )}
      </TitleContainer>

      <ReviewInfo>
        <Link to={`/list?categoryId=${review.categoryId}`}>
          {review.categoryName}
        </Link>
        <span>{formatDate(review.createdAt)}</span>
      </ReviewInfo>

      <Stars stars={review.stars} />

      <Content dangerouslySetInnerHTML={{ __html: review.content }}></Content>

      <Like
        isLiked={review.isLiked}
        likes={review.likes}
        onClick={likeToggle}
      />
    </Container>
  );
}

export default ReviewContent;
