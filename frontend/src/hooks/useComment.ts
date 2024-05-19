import { addComment } from './../../../backend/src/controllers/comment.controller';
import { updateComment } from './../../../backend/src/models/comment.model';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addReviewComment,
  deleteReviewComment,
  updateReviewComment,
} from '@/api/comment.api';
import { fetchReview } from '@/api/review.api';
import { TCommentItemWrite } from '@/models/comment.model';
import { queryClient } from '@/api/queryClient';

function useComments(reviewId: string | undefined) {
  if (!reviewId) return;

  const { data: commentList, isLoading: isReviewLoading } = useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => fetchReview(reviewId),
    enabled: !!reviewId,
    select: (data) => data.comments,
  });

  const { mutate: addComment } = useMutation({
    mutationFn: addReviewComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review', reviewId] });
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: (variables: { commentId: number; data: TCommentItemWrite }) =>
      updateReviewComment(variables.commentId, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review', reviewId] });
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (commentId: number) => deleteReviewComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review', reviewId] });
    },
  });

  return {
    comments: commentList,
    isReviewLoading,
    addComment,
    updateComment,
    deleteComment,
  };
}
export default useComments;
