import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
export default queryClient;
