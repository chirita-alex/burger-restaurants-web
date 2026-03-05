import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { retryHandler } from "./api/utils/retryHandler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: retryHandler,
    },
    mutations: {
      retry: retryHandler,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
