import styled from 'styled-components';
import { IComment } from '@/models/comment.model';
import { formatDate } from '@/utils/format';
import Button from '../common/Button';
import { useState } from 'react';
import useComments from '@/hooks/useComment';
import { useParams } from 'react-router-dom';
import Modal from '../common/Modal';
import useAuthStore from '@/store/auth.store';
import { MODAL_BTNTEXT, MODAL_TITLE } from '@/constance/modalString';

interface Props {
  comment: IComment;
  onUpdate: (commentId: number, content: string) => void;
}

function CommentItem({ comment, onUpdate }: Props) {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isOpen, setIsOpen] = useState(false);
  const { deleteComment } = useComments(id);
  const { isLoggedIn } = useAuthStore();

  const handleEdit = () => {
    setIsEdit(true);
    setEditedContent(comment.content);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditedContent(comment.content);
  };

  const handleSubmit = () => {
    onUpdate(comment.id, editedContent);
    comment.content = editedContent;
    setIsEdit(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(event.target.value);
  };

  const handleDelete = () => {
    deleteComment(comment.id);
    setIsOpen(false);
  };

  return (
    <Container>
      <div className="info">
        <span>{comment.name}</span>
        <span>{formatDate(comment.createdAt)}</span>
      </div>
      {isEdit ? (
        <input
          className="editInput"
          type="text"
          value={editedContent}
          onChange={handleChange}
          autoFocus
        />
      ) : (
        <div className="cont">{comment.content}</div>
      )}
      {isLoggedIn && (
        <ButtonContainer>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title={MODAL_TITLE.COMMENT_DELETE}
            buttonText={MODAL_BTNTEXT.DELETE}
            onConfirm={handleDelete}
          ></Modal>
          {isEdit ? (
            <>
              <Button size="small" scheme="primary" onClick={handleSubmit}>
                수정 완료
              </Button>
              <Button size="small" scheme="border" onClick={handleCancel}>
                취소
              </Button>
            </>
          ) : comment.isAuthor ? (
            <>
              <Button size="small" scheme="primary" onClick={handleEdit}>
                수정
              </Button>
              <Button
                size="small"
                scheme="border"
                onClick={() => setIsOpen(true)}
              >
                삭제
              </Button>
            </>
          ) : null}
        </ButtonContainer>
      )}
    </Container>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 8px;
`;

const Container = styled.div`
  padding: 10px 0;

  .info {
    display: flex;
    gap: 12px;

    span {
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
    span:last-child {
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    }
  }

  .editInput {
    width: 100%;
    border: none;
    margin-top: 5px;
    padding: 10px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    outline: none;
  }

  .cont {
    margin-top: 5px;
    padding: 10px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }
`;

export default CommentItem;
