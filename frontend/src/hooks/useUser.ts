import { getUserInfo } from '@/api/user.api';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  const { data: userInfo, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    throwOnError: true,
  });

  return {
    userInfo,
    isLoadingUsers,
  };
};
