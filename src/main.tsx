import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryProvider } from "./libs/tanstack/query/QueryProvider";
import { ChakraProvider } from "./libs/chakra/ChakraProvider";
import { RouterProvider } from "./libs/tanstack/router/RouterProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ChakraProvider>
        <RouterProvider />
      </ChakraProvider>
    </QueryProvider>
  </StrictMode>
);
