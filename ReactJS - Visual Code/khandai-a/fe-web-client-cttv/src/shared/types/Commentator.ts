import type { StreamSource } from "./StreamSource";

type Commentator = {
  id: number;
  avatarUrl: string;
  nickname: string;
  chatChannelKeyId?: string | null;
  streams: StreamSource[];
};

export type { Commentator };
