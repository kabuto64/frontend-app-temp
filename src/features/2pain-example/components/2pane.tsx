import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import { LuFolder, LuHouse, LuUser } from "react-icons/lu";
import { Title } from "@/components/custom-ui/title";
import { Splitter } from "@ark-ui/react/splitter";
import { Box, Center } from "@chakra-ui/react";
import { useUsers } from "../hooks/useUsers";
import { useColumns } from "../hooks/useColumns";
import { DataTable } from "@/components/custom-ui/datatable";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs } from "@chakra-ui/react";

export function Example2pane() {
  const { data: users, isFetching, error } = useUsers();
  const columns = useColumns();
  if (error) return <div>Error occurred</div>;
  return (
    <>
      <BreadcrumbRoot mb={1} variant="plain">
        <BreadcrumbLink href="#">
          <LuHouse /> Home
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Example-2pain</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Title title="Example-2pain" description="This is a ExamplePage" />
      <Tabs.Root defaultValue="members">
        <Tabs.List>
          <Tabs.Trigger value="members">
            <LuUser />
            Members
          </Tabs.Trigger>
          <Tabs.Trigger value="projects" disabled>
            <LuFolder />
            Projects
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="members">
          <Splitter.Root
            defaultSize={[
              { id: "a", size: 70 },
              { id: "b", size: 30 },
            ]}
            asChild
          >
            <Box>
              <Splitter.Panel id="a" asChild>
                <Box>
                  <DataTable
                    data={users}
                    columns={columns}
                    height="calc(100vh - 240px)"
                    width="100%"
                    isFetching={isFetching}
                    dummyItemLength={20}
                  />
                </Box>
              </Splitter.Panel>
              <Splitter.ResizeTrigger id="a:b" asChild>
                <Center
                  mx={"2"}
                  my={20}
                  w={1}
                  bg={"bg.muted"}
                  _hover={{
                    bg: "bg.emphasized",
                  }}
                  rounded={"md"}
                ></Center>
              </Splitter.ResizeTrigger>
              <Splitter.Panel id="b" asChild>
                <Box
                  borderColor={"border"}
                  borderWidth={1}
                  borderRadius={"lg"}
                  h={"calc(100vh - 240px)"}
                  minW={"300px"}
                >
                  <Box p={3} fontWeight={"600"}>
                    Detail
                  </Box>
                  <Box p={1.5}>
                    <EmptyState
                      icon={<LuUser />}
                      title="No user selected"
                      description="Select a user from the list to display details."
                    />
                  </Box>
                </Box>
              </Splitter.Panel>
            </Box>
          </Splitter.Root>
        </Tabs.Content>
        <Tabs.Content value="projects"></Tabs.Content>
      </Tabs.Root>
    </>
  );
}
