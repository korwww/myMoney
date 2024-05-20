import { addReport } from '@/api/report.api';
import {
  fetchReview,
  unlikeReview,
  likeReview,
  deleteReview,
} from '@/api/review.api';
import { IReviewDetail } from '@/models/review.model';
import useAuthStore from '@/store/auth.store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useReviewDetail = (reviewId: string | undefined) => {
  const [review, setReview] = useState<IReviewDetail | null>(null);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const likeToggle = () => {
    if (!isLoggedIn) {
      window.alert('로그인이 필요합니다.');
      return;
    }

    if (!review) return;

    if (review.isLiked) {
      unlikeReview(review.id).then(() => {
        setReview({
          ...review,
          isLiked: false,
          likes: review.likes - 1,
        });
      });
    } else {
      likeReview(review.id).then(() => {
        setReview({
          ...review,
          isLiked: true,
          likes: review.likes + 1,
        });
      });
    }
  };

  const deleteToggle = () => {
    if (!isLoggedIn) {
      window.alert('로그인이 필요합니다.');
      return;
    }
    if (!review) return;

    deleteReview(review.id).then(() => {
      navigate(`/list`);
    });
  };

  const reportToggle = () => {
    const data = {
      reason: '',
      reportedUserId: 1,
    };
    addReport(data);
  };

  useEffect(() => {
    if (!reviewId) return;

    fetchReview(reviewId).then((review) => {
      setReview(review);
    });
  }, [reviewId]);

  return { review, likeToggle, deleteToggle, reportToggle };
};
