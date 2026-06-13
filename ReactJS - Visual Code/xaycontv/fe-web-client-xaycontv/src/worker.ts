import type { Fixture } from "./types/Fixture";

export type FilterMessage = {
  fixtures: Fixture[];
  sportId: number;
};

self.onmessage = (e: MessageEvent<FilterMessage>) => {
  const { fixtures, sportId } = e.data;

  // Xử lý nặng ở worker (không block UI)
  const filtered = fixtures.filter((f) => f.sport.id === sportId);

  // Gửi kết quả về thread chính
  postMessage(filtered);
};
