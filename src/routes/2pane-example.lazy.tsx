import { Example2pane } from "@/features/2pain-example/components/2pane";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/2pane-example")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Example2pane />;
}
