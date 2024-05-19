import { useMutation, useQuery } from '@tanstack/react-query';

import { cancelReport, getSuspendedUsers } from '@/api/report.api';
import { fetchUnverifiedReviews, fetchApproveReview } from '@/api/admin.api';

export const useAdmin = () => {
  // 정지 유저 가져오기
  const {
    data: suspendedUsers,
    isLoading: isLoadingSuspendedUsers,
    refetch: refetchSuspendedUsers,
  } = useQuery({
    queryKey: ['getSuspendedUsers'],
    queryFn: getSuspendedUsers,
    throwOnError: true,
  });

  // 신고 취소 처리하기
  const cancelReportMutation = useMutation({
    mutationFn: cancelReport,
    throwOnError: true,
    onSuccess: () => {
      refetchSuspendedUsers();
    },
  });
  const fetchCancelReport = (reportId: number) => {
    cancelReportMutation.mutate(reportId);
  };

  // 미인증 후기 가져오기
  const {
    data: unverifiedReviews,
    isLoading: isLoadingUnverifiedReviews,
    refetch: refetchUnverifiedReviews,
  } = useQuery({
    queryKey: ['unverifiedReviews'],
    queryFn: fetchUnverifiedReviews,
    throwOnError: true,
  });

  // 미인증 후기 인증처리하기
  const approveReviewMutation = useMutation({
    mutationFn: fetchApproveReview,
    onSuccess: () => {
      refetchUnverifiedReviews();
    },
    throwOnError: true,
  });

  const approveReview = (reviewId: number) => {
    approveReviewMutation.mutate(reviewId);
  };

  return {
    suspendedUsers: suspendedUsers?.users || [],
    isLoadingSuspendedUsers,
    fetchCancelReport,
    approveReview,
    isLoadingUnverifiedReviews,
    unverifiedReviews: unverifiedReviews?.reviews || [],
  };
};
