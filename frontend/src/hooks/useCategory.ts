import { useQuery } from '@tanstack/react-query';

import { fetchCategory } from '@/api/category.api';

export function useCategory() {
  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: fetchCategory,
    throwOnError: true,
  });

  return { categoryList: data, isLoading };
}
