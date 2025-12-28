// TanStack Query hooks for categories

import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => ApiService.fetchCategories(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
