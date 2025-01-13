import { Example3pane } from "@/features/3pane-example/components/3pane";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/3pane-example")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Example3pane />;
}
