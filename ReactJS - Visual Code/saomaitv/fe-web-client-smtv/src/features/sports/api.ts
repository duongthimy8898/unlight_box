/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "../../shared/lib/apiClient";
import type { Sport } from "../../shared/types/Sport";

const sportsApi = {
  getList: async () => {
    return apiClient.get<Sport[]>("/sports").then((r) => (r.data as any).data);
  },
  getDetail: (id: number) => apiClient.get<Sport>(`/sports/get/?by=id&value=${id}`).then((r) => (r.data as any).data),
};

export default sportsApi;
