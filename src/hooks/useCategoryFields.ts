// TanStack Query hook for category fields

import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api";

export const useCategoryFields = (categorySlug: string | null) => {
  return useQuery({
    queryKey: ["categoryFields", categorySlug],
    queryFn: () => {
      if (!categorySlug) throw new Error("Category slug is required");
      return ApiService.fetchCategoryFields(categorySlug);
    },
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
