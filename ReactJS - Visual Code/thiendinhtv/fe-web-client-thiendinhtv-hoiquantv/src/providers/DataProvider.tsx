import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSports, fetchLeagues, fetchFixtures, fetchReplays, fetchAdBanners, fetchAdButtons, fetchFixturesStats } from "../services/api";
import { DataContext } from "../contexts/Data.context";
import { useContainerLoader } from "../hooks/useContainerLoader";

function DataProvider({ children }: { children: React.ReactNode }) {
  const { setLoading } = useContainerLoader();

  const sports = useQuery({
    queryKey: ["sports"],
    queryFn: fetchSports,
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });

  const leagues = useQuery({
    queryKey: ["leagues"],
    queryFn: fetchLeagues,
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });

  // ✅ Fixtures theo từng nhóm
  const unfinishedFixtures = useQuery({
    queryKey: ["fixtures", "unfinished"],
    queryFn: () => fetchFixtures("unfinished"),
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });

  const finishedFixtures = useQuery({
    queryKey: ["fixtures", "finished"],
    queryFn: () => fetchFixtures("finished"),
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });

  const fixtures = useMemo(() => {
    return [...(unfinishedFixtures.data || []), ...(finishedFixtures.data || [])];
  }, [unfinishedFixtures.data, finishedFixtures.data]);

  const featuredFixtures = useMemo(() => {
    return unfinishedFixtures.data?.filter((fixture) => fixture.isHot) ?? [];
  }, [unfinishedFixtures.data]);

  const unfinishedFixtureIds = unfinishedFixtures.data?.map((f) => f.referenceId).filter((id): id is string => id !== null) ?? [];

  const fixturesStats = useQuery({
    queryKey: ["fixturesStats"],
    queryFn: () => fetchFixturesStats(unfinishedFixtureIds),
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchInterval: 5000,
    staleTime: Infinity,
    enabled: unfinishedFixtureIds.length > 0,
  });

  const replays = useQuery({
    queryKey: ["replays"],
    queryFn: fetchReplays,
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });

  const adBanners = useQuery({
    queryKey: ["adBanners"],
    queryFn: fetchAdBanners,
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });

  const adButtons = useQuery({
    queryKey: ["adButtons"],
    queryFn: fetchAdButtons,
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: Infinity,
  });

  // ✅ Loader dựa trên sports + fixturesAll
  useEffect(() => {
    const isFirstLoading = sports.isLoading || unfinishedFixtures.isLoading || finishedFixtures.isLoading;
    setLoading(isFirstLoading);
  }, [sports.isLoading, unfinishedFixtures.isLoading, finishedFixtures.isLoading, setLoading]);

  return (
    <DataContext.Provider
      value={{
        sports,
        leagues,
        unfinishedFixtures,
        finishedFixtures,
        fixtures,
        featuredFixtures,
        replays,
        adBanners,
        adButtons,
        fixturesStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
