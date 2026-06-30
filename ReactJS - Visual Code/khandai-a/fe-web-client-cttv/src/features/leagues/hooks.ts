import { useQuery } from "@tanstack/react-query";
import { leagueQueries } from "./queries";

const useList = () => {
  return useQuery(leagueQueries.list());
};

const useDetail = (id: string) => {
  return useQuery(leagueQueries.detail(id));
};

const useLeagues = {
  list: useList,
  detail: useDetail,
};

export { useLeagues };
