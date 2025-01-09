import { EmptyState } from "@/components/ui/empty-state";
import { BiCommentError } from "react-icons/bi";

export function Projects() {
  return (
    <>
      <EmptyState
        icon={<BiCommentError />}
        title="Your projects is empty"
        description="Explore our products and add items to your project"
      />
    </>
  );
}
