import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "./store";
import { verifyToken } from "./api";
import { useEffect } from "react";

export function useAuthInit() {
  const token = useAuthStore((s) => s.token); // một nguồn duy nhất

  const query = useQuery({
    queryKey: ["auth", "init"],
    queryFn: () => verifyToken(token!),
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.isError) useAuthStore.getState().logout();
  }, [query.isError]);

  return { isLoading: !!token && query.isLoading };
}
