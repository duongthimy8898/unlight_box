import { useQueries, useQuery } from "@tanstack/react-query";
import fixtureQueries from "./queries";
import type { Fixture } from "../../shared/types/Fixture";
import type { FixtureStats } from "../../shared/types/FixtureStats";

const FIXTURE_STATES = ["unfinished", "finished"] as const;
const useListByState = (state: string) => {
  return useQuery<Fixture[]>(fixtureQueries.listByState(state));
};

const useDetail = (id: number) => {
  return useQuery<Fixture>(fixtureQueries.detail(id));
};

const useList = () => {
  return useQueries({
    queries: FIXTURE_STATES.map((state) => fixtureQueries.listByState(state)),
    combine: (results) => ({
      data: results.flatMap((r) => r.data ?? []),
      isLoading: results.some((r) => r.isLoading),
      isError: results.some((r) => r.isError),
    }),
  });
};

const useListBySport = (sportId: number) => {
  const results = useList();

  return {
    ...results,
    data: results.data.filter((f) => f.sport.id === sportId),
  };
};

const useListStats = () => {
  const listQuery = useList();

  const referenceIds: string[] =
    listQuery.data?.map((f) => f.referenceId).filter((id): id is string => id !== null) ?? [];

  return useQuery<FixtureStats[]>({
    ...fixtureQueries.listStats(referenceIds),
    enabled: referenceIds.length > 0,
  });
};

const useFixtures = {
  list: useList,
  listByState: useListByState,
  listBySport: useListBySport,
  detail: useDetail,

  listStats: useListStats,
};

export { useFixtures };
