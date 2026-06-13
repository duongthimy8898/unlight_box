import { queryOptions } from "@tanstack/react-query";
import fixturesApi from "./api";
import type { Fixture } from "../../shared/types/Fixture";
import type { FixtureStats } from "../../shared/types/FixtureStats";
import queryClient from "../../app/queryClient";

const fixtureQueries = {
  list: queryOptions<Fixture[]>({
    queryKey: ["fixtures", "list"],
    queryFn: () => fixturesApi.getList(),
    staleTime: 10_000,
    refetchInterval: 15_000,
  }),

  listStats: (referenceIds: string[]) =>
    queryOptions<FixtureStats[]>({
      queryKey: ["fixtures", "stats", referenceIds],
      queryFn: async () => {
        const data = await fixturesApi.getListStats(referenceIds);
        data.forEach((item: FixtureStats) => {
          queryClient.setQueryData(["fixtures", "stats", item.fixture.id.toString()], item);
        });
        return data;
      },
      staleTime: 10_000,
      refetchInterval: 15_000,
    }),
};

export { fixtureQueries };
