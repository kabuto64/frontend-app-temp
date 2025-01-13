import { Stack, Card, HStack, Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { LinkOptions, useNavigate } from "@tanstack/react-router";
import { Title } from "@/components/custom-ui/title";
import { IconType } from "react-icons";
import { IoMdSettings } from "react-icons/io";
import { BreadcrumbLink, BreadcrumbRoot } from "@/components/ui/breadcrumb";
import { LuHouse } from "react-icons/lu";
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
          <Box color={"fg.muted"} fontSize={"2xl"}>
            <CardIcon />
          </Box>
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
      <BreadcrumbRoot mb={1} variant="plain">
        <BreadcrumbLink href="#">
          <LuHouse /> Home
        </BreadcrumbLink>
      </BreadcrumbRoot>
      <Title title="Welcome!" description="This is a StartPage" />
      <Stack gap="4" direction="row" wrap="wrap" mt={5}>
        <ContentCard
          icon={IoMdSettings}
          title={"Example"}
          description={"Basic Example Page."}
          link={{ to: "/example" }}
        />
        <ContentCard
          icon={IoMdSettings}
          title={"Example 2pane"}
          description={"2pane Example Page."}
          link={{ to: "/2pane-example" }}
        />
        <ContentCard
          icon={IoMdSettings}
          title={"Example 3pane"}
          description={"3pane Example Page."}
          link={{ to: "/3pane-example" }}
        />
      </Stack>
    </>
  );
}
