import {
  createRouter,
  RouterProvider as TanstackRouterProvider,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "@/routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function RouterProvider() {
  return <TanstackRouterProvider router={router} />;
}
