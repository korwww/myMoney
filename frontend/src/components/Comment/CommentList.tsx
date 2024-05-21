import styled from 'styled-components';
import CommentAdd from './CommentAdd';
import CommentItem from './CommentItem';
import { useParams } from 'react-router-dom';
import useComments from '@/hooks/useComment';
import Loading from '../common/Loading';
import { IComment } from '@/models/comment.model';

function CommentList() {
  const { id } = useParams(); // reviewId
  const {
    comments: commentLists,
    isReviewLoading,
    addComment,
    updateComment,
  } = useComments(id);

  if (isReviewLoading) return <Loading />;

  const handleUpdateComment = (commentId: number, content: string) => {
    if (!id) return;
    updateComment({ commentId, data: { content, reviewId: id } });
  };

  return (
    <CommentStyle>
      <Title>댓글 {commentLists?.length}</Title>
      <CommentAdd onAdd={addComment} />
      {commentLists?.map((comment: IComment, index: number) => (
        <CommentItem
          key={index}
          comment={comment}
          onUpdate={handleUpdateComment}
        />
      ))}
    </CommentStyle>
  );
}

const CommentStyle = styled.section`
  padding: ${({ theme }) => theme.padding.mainContent};
  margin: 20px 0;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.heading.small.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default CommentList;
