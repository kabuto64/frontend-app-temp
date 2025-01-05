import { Heading, Highlight, Stack, Text, Card } from "@chakra-ui/react";
import { Avatar } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
export function Dashboad() {
  const navigate = useNavigate();

  return (
    <>
      <Stack gap={2} align={"flex-start"}>
        <Heading size="3xl" letterSpacing="tight">
          <Highlight query="with speed" styles={{ color: "teal.600" }}>
            Create accessible React apps with speed
          </Highlight>
        </Heading>
        <Text fontSize="md" color="fg.muted">
          Chakra UI is a simple, modular and accessible component library that
          gives you the building blocks you need.
        </Text>
      </Stack>
      <Stack gap="4" direction="row" wrap="wrap" mt={5}>
        <Card.Root width="320px" variant={"outline"}>
          <Card.Body gap="2">
            <Avatar
              src="https://picsum.photos/200/300"
              name="Nue Camp"
              size="lg"
              shape="rounded"
            />
            <Card.Title mb="2">Nue Camp</Card.Title>
            <Card.Description>
              This is the card body. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline">View</Button>
            <Button onClick={() => navigate({ to: "/about" })}>Join</Button>
          </Card.Footer>
        </Card.Root>
      </Stack>
    </>
  );
}
