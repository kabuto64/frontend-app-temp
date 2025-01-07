import { Stack, Card, HStack, Icon } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { LinkOptions, useNavigate } from "@tanstack/react-router";
import { Title } from "@/components/title";
import { IconType } from "react-icons";
import { IoMdSettings } from "react-icons/io";

type ContentCardProp = {
  icon: IconType;
  title: string;
  description: string;
  link: LinkOptions;
};

const ContentCard = ({
  icon: CardIcon,
  title,
  description,
  link,
}: ContentCardProp) => {
  const navigate = useNavigate();
  return (
    <Card.Root width="320px" variant={"outline"}>
      <Card.Body gap="1">
        <HStack gap="2">
          <Icon color={"fg.muted"} size={"lg"}>
            <CardIcon />
          </Icon>
          <Card.Title>{title}</Card.Title>
        </HStack>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button size={"sm"} onClick={() => navigate(link)}>
          Join
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export function Dashboad() {
  return (
    <>
      <Title title="Welcome!" description="This is a StartPage" />
      <Stack gap="4" direction="row" wrap="wrap" mt={5}>
        <ContentCard
          icon={IoMdSettings}
          title="Example"
          description="This is a Example page."
          link={{ to: "/about" }}
        />
      </Stack>
    </>
  );
}
