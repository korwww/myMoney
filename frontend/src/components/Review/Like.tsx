import styled from 'styled-components';
import Icon from '../common/Icon';
import { IReviewDetail } from '@/models/review.model';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface Props {
  review: IReviewDetail;
  onClick: () => void;
}

function Like({ review, onClick }: Props) {
  return (
    <LikeStyle>
      <p>{review.likes}명에게 도움이 된 리뷰에요.</p>

      <div className="likeButton" role="button" onClick={onClick}>
        {review.isLiked ? (
          <Icon width={24} icon={<AiFillHeart />} fill="#d1423c" />
        ) : (
          <Icon width={24} icon={<AiOutlineHeart />} />
        )}
      </div>
    </LikeStyle>
  );
}

const LikeStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 10px 0;

  p {
    padding-top: 3px;
    font-size: ${({ theme }) => theme.text.medium.fontSize};
  }

  .likeButton {
    cursor: pointer;

    &:hover {
      svg {
        fill: #d1423c;
      }
    }
  }
`;

export default Like;
