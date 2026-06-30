// features/matches/api.ts

import { apiClient } from "../../shared/lib/apiClient";
import type { League } from "../../shared/types/League";

const leaguesApi = {
  getList: () => apiClient.get<League[]>("/leagues").then((r) => r.data),
  getDetail: (id: string) => apiClient.get<League>(`/leagues/${id}`).then((r) => r.data),
};

export default leaguesApi;
