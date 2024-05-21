import styled from 'styled-components';
import Button from '../common/Button';
import { TCommentItemWrite } from '@/models/comment.model';
import { useForm } from 'react-hook-form';
import Input from '../common/Input';

interface Props {
  onAdd: (data: TCommentItemWrite) => void;
}

function CommentAdd({ onAdd }: Props) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCommentItemWrite>();

  const onSubmit = (data: TCommentItemWrite) => {
    onAdd(data);
    reset();
  };

  return (
    <CommentAddStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Input
            $inputType="text"
            placeholder="댓글을 작성해주세요."
            {...register('content', { required: 'true' })}
          ></Input>
          {errors.content && (
            <p className="error-text">댓글 내용을 입력해주세요.</p>
          )}
        </fieldset>
        <ButtonContainer>
          <Button size="small" scheme="primary">
            등록
          </Button>
        </ButtonContainer>
      </form>
    </CommentAddStyle>
  );
}

const CommentAddStyle = styled.div`
  margin: 20px 0 5px;

  form {
    display: flex;
    flex-direction: column;

    .error-text {
      font-size: ${({ theme }) => theme.text.small.fontSize};
      color: red;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 8px;
`;

export default CommentAdd;
