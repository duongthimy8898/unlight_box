import type { StreamSource } from "./StreamSource";

type Commentator = {
  id: number;
  avatarUrl: string;
  nickname: string;
  streams: StreamSource[];
};

export type { Commentator };
