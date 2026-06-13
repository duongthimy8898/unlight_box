import { useQuery } from "@tanstack/react-query";
import { sportQueries } from "./queries";
import type { Sport } from "../../shared/types/Sport";

const useList = () => {
  return useQuery<Sport[]>(sportQueries.list());
};

const useDetail = (id: number) => {
  return useQuery<Sport>(sportQueries.detail(id));
};

const useSports = {
  list: useList,
  detail: useDetail,
};

export { useSports };
