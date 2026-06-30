import { useQuery } from "@tanstack/react-query";
import { sportQueries } from "./queries";

const useList = () => {
  return useQuery(sportQueries.list());
};

const useDetail = (id: number) => {
  return useQuery(sportQueries.detail(id));
};

const useSports = {
  list: useList,
  detail: useDetail,
};

export default useSports;
