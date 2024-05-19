import { useQuery } from '@tanstack/react-query';

import { fetchCategory } from '@/api/category.api';
import { ICategoryItem } from '@/models/category.model';

export function useCategory() {
  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: fetchCategory,
    throwOnError: true,
  });
  return { categoryList: data as ICategoryItem[], isLoading };
}
