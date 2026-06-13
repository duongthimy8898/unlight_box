import axios from "axios";
import type { AdBanner, AdButton } from "../types/Ad";
import type { Fixture } from "../types/Fixture";
import type { League } from "../types/League";
import type { Sport } from "../types/Sport";
import type { Replay } from "../types/Replay";
import type { FixtureStats } from "../types/FixtureStats";
const env = import.meta.env;
const baseUrl = env.VITE_SERVER_API_BASE_URL;
const dataApiSportsUrl = env.VITE_SPORT_DATA_API;
// ----- Fake fetch -----
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchSports = async (): Promise<Sport[]> => {
  await delay(1000);
  try {
    const res = await axios.get(`${baseUrl}/sports`);
    // console.log(res.data); // toàn bộ response JSON
    const sData = res.data.data as Sport[];
    sData.sort((a, b) => Number(b.hasLive) - Number(a.hasLive));
    return sData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("API Error:", err.response?.data || err.message);
    } else {
      console.error("Unexpected Error:", err);
    }
    return [];
  }
};

const fetchLeagues = async (): Promise<League[]> => {
  try {
    const res = await axios.get(`${baseUrl}/leagues`);
    // console.log(res.data); // toàn bộ response JSON
    // console.log(res.data.data); // nếu backend trả về { success, code, message, data }
    return res.data.data as League[];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("API Error:", err.response?.data || err.message);
    } else {
      console.error("Unexpected Error:", err);
    }
    return [];
  }
};

const fetchFixtures = async (status: "unfinished" | "finished"): Promise<Fixture[]> => {
  const endpointsWithStatus = {
    unfinished: `${baseUrl}/fixtures/unfinished`,
    finished: `${baseUrl}/fixtures/finished`,
  };
  try {
    const res = await axios.get(endpointsWithStatus[status]);
   
    // console.log(res.data); // toàn bộ response JSON
    const fData = res.data.data as Fixture[];
    fData.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    return fData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("API Error:", err.response?.data || err.message);
    } else {
      console.error("Unexpected Error:", err);
    }
    return [];
  }
};

const fetchReplays = async (): Promise<Replay[]> => {
  try {
    const res = await axios.get(`${baseUrl}/replays`);
    // console.log(res.data); // toàn bộ response JSON
    const rData = res.data.data as Replay[];
    rData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return rData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("API Error:", err.response?.data || err.message);
    } else {
      console.error("Unexpected Error:", err);
    }
    return [];
  }
};

const fetchAdBanners = async (): Promise<AdBanner[]> => {
  await delay(2000); // simulate network
  return [];
};

const fetchAdButtons = async (): Promise<AdButton[]> => {
  await delay(2000); // simulate network
  return [];
};

const fetchFixturesStats = async (fixtureIds: string[]) => {
  try {
    const res = await axios.get(`${dataApiSportsUrl}/fixtures`, {
      params: {
        by: "ids",
        value: fixtureIds.join("-"),
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
          ft.fixture.status.short = "Giữa Hiệp";
          break;
        case "NS":
          ft.fixture.status.short = "Sắp bắt đầu";
          break;
        default:
          ft.fixture.status.short = "Kết thúc";
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
};

export { fetchSports, fetchLeagues, fetchFixtures, fetchReplays, fetchAdButtons, fetchAdBanners, fetchFixturesStats };
