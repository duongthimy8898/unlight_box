/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SERVER_API_BASE_URL: string;
  // 👉 khai báo thêm biến tại đây nếu cần
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
