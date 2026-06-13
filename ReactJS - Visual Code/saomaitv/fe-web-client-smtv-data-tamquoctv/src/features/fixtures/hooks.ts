import { useQuery } from "@tanstack/react-query";
import { fixtureQueries } from "./queries";
import type { Fixture } from "../../shared/types/Fixture";
import type { FixtureStats } from "../../shared/types/FixtureStats";

const useList = () => useQuery<Fixture[]>(fixtureQueries.list);

const useListStats = () => {
  const listQuery = useList();
  const referenceIds: string[] = listQuery.data?.map((f) => f.referenceId).filter((id): id is string => id !== null) ?? [];

  return useQuery<FixtureStats[]>({
    ...fixtureQueries.listStats(referenceIds),
    enabled: referenceIds.length > 0,
  });
};

const useFixtures = {
  list: useList,
  listStats: useListStats,
};

export { useFixtures };
