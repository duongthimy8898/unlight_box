/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";
import envConfig from "../../app/configs/env.config";
import { apiClient } from "../../shared/lib/apiClient";
import axios from "axios";
import { FixtureSchema, type Fixture } from "../../shared/types/Fixture";
import type { FixtureStats } from "../../shared/types/FixtureStats";

const fixturesApi = {
  getListByState: (state: string) =>
    apiClient.get<Fixture[]>(`/fixtures/${state}`).then(async (r) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return z
        .array(FixtureSchema)
        .parse((r.data as any).data)
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    }),
  getDetail: (id: number) =>
    apiClient.get<Fixture>(`/fixtures/get?by=id&value=${id}`).then((r) => FixtureSchema.parse((r.data as any).data)),

  getListStats: async (referenceIds: string[]) => {
    try {
      const res = await apiClient.get(`${envConfig.SPORT_DATA_API_URL}/fixtures`, {
        params: {
          by: "ids",
          value: referenceIds.join("-"),
        },
      });
      if (res.status !== 200) throw new Error(`Failed to fetch fixture stats: ${res.statusText}`);
      const results = res.data.results as FixtureStats[];
      results.forEach((ft) => {
        switch (ft.fixture.status.short) {
          case "1H":
            ft.fixture.status.short = "H1";
            break;
          case "2H":
            ft.fixture.status.short = "H2";
            break;
          case "HT":
            ft.fixture.status.short = "HT";
            break;
          case "NS":
            ft.fixture.status.short = "NS";
            break;
          default:
            ft.fixture.status.short = "KT";
        }
      });
      return results;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("API Error:", err.response?.data || err.message);
      } else {
        console.error("Unexpected Error:", err);
      }
      return [];
    }
  },
};

export default fixturesApi;
