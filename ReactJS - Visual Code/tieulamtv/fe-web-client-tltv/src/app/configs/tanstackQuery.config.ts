import type { QueryClientConfig } from "@tanstack/react-query";

const tanstackQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 3, // Retry failed requests once
    },

  },
};

export default tanstackQueryConfig;
