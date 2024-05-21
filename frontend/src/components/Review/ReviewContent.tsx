import Icon from '../common/Icon';
import Like from './Like';
import { Siren } from '@/assets/icons/Siren';
import { IReviewDetail } from '@/models/review.model';
import { AiFillStar } from 'react-icons/ai';
import { useReviewDetail } from '@/hooks/useReviewDetail';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import {
  MODAL_TYPES,
  MODAL_TITLE,
  MODAL_BTNTEXT,
} from '@/constance/modalString';

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

function ReviewContent() {
  const { id } = useParams();
  const { review, likeToggle, deleteToggle, reportToggle } =
    useReviewDetail(id);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const [modalType, setModalType] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!review) return null;

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedOption('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOption('');
  };

  const handleUpdate = () => {
    if (!isLoggedIn) {
      setModalType(MODAL_TYPES.LOGIN);
      setIsModalOpen(true);
      return;
    }
    navigate(`/review/${id}`);
  };

  const handleDelete = () => {
    if (!isLoggedIn) {
      setModalType(MODAL_TYPES.LOGIN);
      setIsModalOpen(true);
      return;
    }
    setModalType(MODAL_TYPES.DELETE);
    openModal();
  };

  const handleReport = () => {
    if (!isLoggedIn) {
      setModalType(MODAL_TYPES.LOGIN);
      setIsModalOpen(true);
      return;
    }
    setModalType(MODAL_TYPES.REPORT);
    openModal();
  };

  // 모달창 확인버튼 눌렀을 때 다음 동작
  const handleConfirm = (option: string) => {
    if (modalType === MODAL_TYPES.DELETE) {
      deleteToggle();
    }
    if (modalType === MODAL_TYPES.REPORT) {
      reportToggle({ reason: option, reportedUserId: review.userId });
    }
    if (modalType === MODAL_TYPES.LOGIN) {
      navigate(`/login`);
    }
    closeModal();
  };

  return (
    <Container>
      <AuthorContainer>
        <h3 className="nickname">{review.name}</h3>
        {review.isAuthor ? (
          <div className="btn">
            <Btn
              className="update"
              icon={<PencilSimple />}
              onClick={handleUpdate}
            />
            <Btn className="delete" icon={<Trash />} onClick={handleDelete} />
          </div>
        ) : (
          <Btn className="report btn" icon={<Siren />} onClick={handleReport} />
        )}
      </AuthorContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalType === MODAL_TYPES.LOGIN
            ? MODAL_TITLE.LOGIN
            : modalType === MODAL_TYPES.DELETE
              ? MODAL_TITLE.REVIEW_DELETE
              : MODAL_TITLE.REPORT
        }
        buttonText={
          modalType === MODAL_TYPES.LOGIN
            ? MODAL_BTNTEXT.LOGIN
            : modalType === MODAL_TYPES.DELETE
              ? MODAL_BTNTEXT.DELETE
              : MODAL_BTNTEXT.REPORT
        }
        report={modalType === MODAL_TYPES.REPORT}
        onConfirm={handleConfirm}
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
        onClick={
          !isLoggedIn
            ? () => {
                setModalType(MODAL_TYPES.LOGIN);
                setIsModalOpen(true);
                return;
              }
            : likeToggle
        }
      />
    </Container>
  );
}

export default ReviewContent;
