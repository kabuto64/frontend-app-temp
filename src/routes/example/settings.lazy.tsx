import { Settings } from "@/features/example/components/settings/settings";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/example/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Settings />;
}
