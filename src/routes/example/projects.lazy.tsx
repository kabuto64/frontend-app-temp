import { Projects } from "@/features/example/components/projects/projects";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/example/projects")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Projects />;
}
