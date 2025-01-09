import { Heading, Stack, Text } from "@chakra-ui/react";

type TitleProp = {
  title: string;
  description: string;
};

export const Title = ({
  title,
  description,
}: TitleProp) => {
  return (
    <Stack gap={2} align={"flex-start"} mb={5}>
      <Heading size="3xl" letterSpacing="tight">
        {title}
      </Heading>
      <Text fontSize="md" color="fg.muted">
        {description}
      </Text>
    </Stack>
  );
};