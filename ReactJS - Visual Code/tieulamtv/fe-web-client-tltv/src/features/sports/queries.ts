import { queryOptions } from "@tanstack/react-query";
import sportsApi from "./api";
import type { Sport } from "../../shared/types/Sport";

const sportQueries = {
  list: () =>
    queryOptions<Sport[]>({
      queryKey: ["sports", "list"],
      queryFn: () => sportsApi.getList(),
      staleTime: 15_000,
      refetchInterval: 60_000,
    }),
  detail: (id: number) =>
    queryOptions<Sport>({
      queryKey: ["sports", "detail", id],
      queryFn: () => sportsApi.getDetail(id),
      staleTime: 15_000,
      refetchInterval: 60_000,
    }),
};

export { sportQueries };
