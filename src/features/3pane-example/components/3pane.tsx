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
import { useDatailColumns, useMasterColumns } from "../hooks/useColumns";
import { DataTable } from "@/components/custom-ui/datatable";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs } from "@chakra-ui/react";

export function Example3pane() {
  const { data: users, isFetching, error } = useUsers();
  const masterColumns = useMasterColumns();
  const datailColumns = useDatailColumns();
  if (error) return <div>Error occurred</div>;
  return (
    <>
      <BreadcrumbRoot mb={1} variant="plain">
        <BreadcrumbLink href="#">
          <LuHouse /> Home
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Example-3pane</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Title title="Example-3pane" description="This is a ExamplePage" />
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
              { id: "a", size: 20 },
              { id: "b", size: 80 },
            ]}
            asChild
          >
            <Box>
              <Splitter.Panel id="a" asChild>
                <Box minW={"285px"}>
                  <DataTable
                    data={users}
                    columns={masterColumns}
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
                <Box h={"calc(100vh - 240px)"} minW={"300px"}>
                  <Splitter.Root
                    orientation="vertical"
                    defaultSize={[
                      { id: "a", size: 50 },
                      { id: "b", size: 50 },
                    ]}
                  >
                    <Splitter.Panel id="a" asChild>
                      <Box minH={"200px"}>
                        <DataTable
                          data={users}
                          columns={datailColumns}
                          width="100%"
                          height="100%"
                          isFetching={isFetching}
                          dummyItemLength={20}
                        />
                      </Box>
                    </Splitter.Panel>
                    <Splitter.ResizeTrigger id="a:b" asChild>
                      <Center
                        my={"2"}
                        mx={20}
                        h={1}
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
                        minH={"50px"}
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
                  </Splitter.Root>
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
