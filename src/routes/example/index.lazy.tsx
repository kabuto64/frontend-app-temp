import { Users } from "@/features/example/components/users/users";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/example/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Users />;
}
