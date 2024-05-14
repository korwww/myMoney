import { useMutation, useQuery } from '@tanstack/react-query';

import { cancelReport, getSuspendedUsers } from '@/api/report.api';

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
      refetchSuspendedUsers();
    },
  });
  const fetchCancelReport = (reportId: number) => {
    cancelReportMutation.mutate(reportId);
  };
  return {
    suspendedUsers: suspendedUsers?.users || [],
    isLoadingSuspendedUsers,
    fetchCancelReport,
  };
};
