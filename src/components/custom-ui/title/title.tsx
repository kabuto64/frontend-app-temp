import { Heading, Stack, Text } from "@chakra-ui/react";

type TitleProp = {
  title: string;
  description?: string;
};

export const Title = ({ title, description }: TitleProp) => {
  return (
    <>
      <Stack gap={1} align={"flex-start"} mb={2}>
        <Heading size="2xl" fontWeight={"bold"} letterSpacing="tight">
          {title}
        </Heading>
        {description && (
          <Text fontSize="sm" color="fg.muted">
            {description}
          </Text>
        )}
      </Stack>
    </>
  );
};
