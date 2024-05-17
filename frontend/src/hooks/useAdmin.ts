import { useMutation, useQuery } from '@tanstack/react-query';

import { cancelReport, getSuspendedUsers } from '@/api/report.api';
import { fetchUnverifiedReviews, fetchApproveReview } from '@/api/admin.api';

export const useAdmin = () => {
  const {
    data: suspendedUsers,
    isLoading: isLoadingSuspendedUsers,
    refetch: refetchSuspendedUsers,
  } = useQuery({
    queryKey: ['getSuspendedUsers'],
    queryFn: getSuspendedUsers,
    throwOnError: true,
  });

  const cancelReportMutation = useMutation({
    mutationFn: cancelReport,
    throwOnError: true,
    onSuccess: () => {
      refetchSuspendedUsers;
    },
  });
  const fetchCancelReport = (reportId: number) => {
    cancelReportMutation.mutate(reportId);
  };

  const approveReviewMutation = useMutation({
    mutationFn: fetchApproveReview,
    onSuccess: () => {
      refetchSuspendedUsers;
    },
    throwOnError: true,
  });

  const approveReview = (reviewId: number) => {
    approveReviewMutation.mutate(reviewId);
  };

  const { data: unverifiedReviews, isLoading: isLoadingUnverifiedReviews } =
    useQuery({
      queryKey: ['unverifiedReviews'],
      queryFn: fetchUnverifiedReviews,
      throwOnError: true,
    });
  console.log(unverifiedReviews);
  return {
    suspendedUsers: suspendedUsers?.users || [],
    isLoadingSuspendedUsers,
    fetchCancelReport,
    approveReview,
    isLoadingUnverifiedReviews,
    unverifiedReviews: unverifiedReviews?.reviews || [],
  };
};
