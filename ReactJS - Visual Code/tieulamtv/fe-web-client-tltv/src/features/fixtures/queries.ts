import { queryOptions } from "@tanstack/react-query";
import fixturesApi from "./api";
import { queryClient } from "../../app/services";
import type { Fixture } from "../../shared/types/Fixture";
import type { FixtureStats } from "../../shared/types/FixtureStats";

const fixtureQueries = {
  listByState: (state: string) =>
    queryOptions<Fixture[]>({
      queryKey: ["fixtures", "list", state],
      queryFn: () => fixturesApi.getListByState(state),
      staleTime: 10_000,
      refetchInterval: 15_000,
    }),
  detail: (id: number) =>
    queryOptions<Fixture>({
      queryKey: ["fixtures", "detail", id],
      queryFn: () => fixturesApi.getDetail(id),
      staleTime: 10_000,
      refetchInterval: 15_000,
    }),

  listStats: (referenceIds: string[]) =>
    queryOptions<FixtureStats[]>({
      queryKey: ["fixtures", "stats", referenceIds],
      queryFn: async () => {
        const data = await fixturesApi.getListStats(referenceIds);
        data.forEach((item: FixtureStats) => {
          queryClient.setQueryData(["fixtures", "stats", item.fixture.id], item);
        });
        return data;
      },
      staleTime: 10_000,
      refetchInterval: 15_000,
    }),
};

export default fixtureQueries;
