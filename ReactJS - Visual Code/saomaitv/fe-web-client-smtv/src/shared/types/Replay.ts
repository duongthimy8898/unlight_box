import type { Sport } from "./Sport";

export type Replay = {
  id: number;
  slug: string;
  sport: Sport;                // populated object từ server
  title: string;
  thumbnailUrl: string;
  videoSourceUrl: string;
  createdAt: string;           // API trả ISO string (convert sang Date nếu cần)
  updatedAt: string;
}