import { Dashboad } from "@/features/dashboad";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <Dashboad />;
}
