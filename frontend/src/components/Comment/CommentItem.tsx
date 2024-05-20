import styled from 'styled-components';
import { IComment } from '@/models/comment.model';
import { formatDate } from '@/utils/format';
import Button from '../common/Button';
import { useState } from 'react';
import useComments from '@/hooks/useComment';
import { useParams } from 'react-router-dom';
import Modal from '../common/Modal';

interface Props {
  comment: IComment;
  onUpdate: (id: number, content: string) => void;
}

function CommentItem({ comment, onUpdate }: Props) {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isOpen, setIsOpen] = useState(false);
  const { deleteComment } = useComments(id);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditedContent(comment.content);
  };

  const handleSubmit = () => {
    setIsEdit(false);
    onUpdate(comment.id, editedContent);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(event.target.value);
  };

  const handleConfirmDelete = () => {
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

      <ButtonContainer>
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
            <Button size="small" scheme="border" onClick={handleEdit}>
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
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="댓글을 삭제하시겠어요?"
        buttonText="삭제"
        onConfirm={handleConfirmDelete}
      ></Modal>
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
