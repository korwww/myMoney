import { useMutation, useQuery } from '@tanstack/react-query';

import { deleteReport, getSuspendedUsers } from '@/api/report.api';
import { fetchUnverifiedReviews, fetchApproveReview } from '@/api/admin.api';

export const useAdmin = () => {
  // 정지된 사용자 정보 가져오기
  const {
    data: suspendedUsersData,
    isLoading: isLoadingSuspendedUsers,
    refetch: refetchSuspendedUsers,
  } = useQuery({
    queryKey: ['getSuspendedUsers'],
    queryFn: getSuspendedUsers,
    throwOnError: true,
  });

  // 신고 취소 처리하기
  const deleteReportMutation = useMutation({
    mutationFn: deleteReport,
    throwOnError: true,
    onSuccess: () => {
      refetchSuspendedUsers();
      alert('신고가 취소되었습니다.');
    },
  });
  const deleteReportAction = (reportId: number) => {
    deleteReportMutation.mutate(reportId);
  };

  // 미인증 후기 가져오기
  const {
    data: unverifiedReviewsData,
    isLoading: isLoadingUnverifiedReviews,
    refetch: refetchUnverifiedReviews,
  } = useQuery({
    queryKey: ['unverifiedReviews'],
    queryFn: fetchUnverifiedReviews,
    throwOnError: true,
  });

  // 미인증 후기 인증 처리하기
  const approveReviewMutation = useMutation({
    mutationFn: fetchApproveReview,
    onSuccess: () => {
      refetchUnverifiedReviews();
      alert('후기를 승인처리했습니다.');
    },
    throwOnError: true,
  });

  const approveReview = (reviewId: number) => {
    approveReviewMutation.mutate(reviewId);
  };

  return {
    suspendedUsers: suspendedUsersData?.users || [],
    isLoadingSuspendedUsers,
    deleteReportAction,
    approveReview,
    isLoadingUnverifiedReviews,
    unverifiedReviews: unverifiedReviewsData?.reviews || [],
  };
};
