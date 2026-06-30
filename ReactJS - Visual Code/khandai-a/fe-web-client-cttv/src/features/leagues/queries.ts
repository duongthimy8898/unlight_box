// features/matches/queries.ts
import { queryOptions } from "@tanstack/react-query";
import sportsApi from "./api";

const leagueQueries = {
  list: () =>
    queryOptions({
      queryKey: ["leagues", "list"],
      queryFn: () => sportsApi.getList(),
      staleTime: 10_000,
      refetchInterval: 15_000,
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: ["leagues", "detail", id],
      queryFn: () => sportsApi.getDetail(id),
      staleTime: 10_000,
      refetchInterval: 15_000,
    }),
};

export { leagueQueries };
