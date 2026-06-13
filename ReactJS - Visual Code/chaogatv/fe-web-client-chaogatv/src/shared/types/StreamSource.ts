import type { Commentator } from "./Commentator";

type StreamSource = {
  id: number;
  referenceId: string | null;
  name: string;
  commentator: Commentator;
  sourceUrl?: string;
};

export type { StreamSource };
