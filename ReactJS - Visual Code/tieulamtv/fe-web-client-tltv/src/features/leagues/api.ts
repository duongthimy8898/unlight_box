/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "../../shared/lib/apiClient";
import type { League } from "../../shared/types/League";

const leaguesApi = {
  getList: () => apiClient.get<League[]>("/leagues").then((r) => (r.data as any).data),
  getDetail: (id: string) => apiClient.get<League>(`/leagues/${id}`).then((r) => (r.data as any).data),
};

export default leaguesApi;
