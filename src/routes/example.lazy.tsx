import { Example } from "@/features/example";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/example")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Example />;
}
