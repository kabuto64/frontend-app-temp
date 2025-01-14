import { useMemo } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { Box, Flex, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { Project } from "../types";
import { format } from "date-fns";
import { useProjects } from "../hooks/useProjects";
import { useProjectColumns } from "../hooks/useColumns";
import { LuCalendar, LuUser } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
// 型定義
type ProjectCardProps = {
  project: Project;
};
const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <>
      <Box
        mx={2}
        bg={"bg.panel"}
        borderRadius={"md"}
        borderWidth={"1px"}
        w={"100%"}
        _hover={{ bg: "bg.muted" }}
        cursor={"pointer"}
      >
        <HStack px={3} py={2} gap="3">
          <Box>
            <IoMdSettings />
          </Box>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {project.projectName}
            </Text>
            <HStack color="fg.muted" textStyle="sm">
              @{project.projectNumber}
            </HStack>
          </Stack>
        </HStack>
        <Flex px={3} mb="2" gap="3" justifyContent={"space-between"}>
          <HStack color="fg.muted" textStyle="sm">
            <LuUser />
            {project.projectManager}
          </HStack>
          <HStack color="fg.muted" textStyle="xs">
            <LuCalendar />
            {format(new Date(project.lastUpdated), "yyyy-MM-dd")}
          </HStack>
        </Flex>
      </Box>
    </>
  );
};
const SkeletonCard = () => {
  return (
    <>
      <Box
        mx={2}
        bg={"bg.panel"}
        borderRadius={"md"}
        borderWidth={"1px"}
        w={"100%"}
        _hover={{ bg: "bg.muted" }}
        cursor={"pointer"}
      >
        <HStack px={3} py={2} gap="3">
          <SkeletonCircle size={6} />
          <Stack gap="1">
            <Skeleton height={5} w={"150px"} />
            <Skeleton height={4} w={"70px"} />
          </Stack>
        </HStack>
        <Flex px={3} mb="2" gap="3" justifyContent={"space-between"}>
          <HStack color="fg.muted" textStyle="sm">
            <LuUser />
            <Skeleton height="5" w={"100px"} />
          </HStack>
          <HStack color="fg.muted" textStyle="sm">
            <LuCalendar />
            <Skeleton height="5" w={"80px"} />
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

// メインのテーブルコンポーネント
export function ProjectList() {
  const { data: projects, isFetching, error } = useProjects();
  const projectColumns = useProjectColumns();
  const memoizedData = useMemo(() => projects, [projects]);

  const table = useReactTable({
    data: memoizedData,
    columns: projectColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) return <div>Error occurred</div>;

  return (
    <>
      <Box
        borderColor={"border"}
        borderWidth={1}
        borderRadius={"lg"}
        minH={"50px"}
        h={"calc(100vh - 210px)"}
        overflowY={"auto"}
      >
        <Box px={3} py={2} fontWeight={"600"}>
          Projects
        </Box>
        {isFetching ? (
          <VStack p={2} gap={2}>
            {Array(20)
              .fill(null)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </VStack>
        ) : (
          <VStack p={2} gap={2}>
            {table.getRowModel().rows.map((row) => (
              <ProjectCard key={row.original.id} project={row.original} />
            ))}
          </VStack>
        )}
      </Box>
    </>
  );
}
