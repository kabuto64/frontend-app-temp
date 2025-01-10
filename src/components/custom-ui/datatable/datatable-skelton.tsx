import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  Box,
  Table as ChakraTable,
  HStack,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import { BiSort } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";

// 型定義
type BaseRecord = { id: string | number };

// スケルトンテーブルコンポーネント
export function SkeltonDataTable<T extends BaseRecord>({
  columns,
  rowCount = 10,
  height,
}: {
  columns: ColumnDef<T>[];
  rowCount?: number;
  height?: string;
}) {
  // ダミーデータの作成
  const dummyData = useMemo(
    () =>
      Array.from({ length: rowCount }).map(
        (_, index) =>
          ({
            id: index,
          }) as T
      ),
    [rowCount]
  );

  const table = useReactTable({
    data: dummyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    return headers.reduce(
      (acc, header) => ({
        ...acc,
        [`--header-${header.id}-size`]: header.getSize(),
        [`--col-${header.column.id}-size`]: header.column.getSize(),
      }),
      {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  return (
    <ChakraTable.ScrollArea
      borderWidth="1px"
      rounded="md"
      height={height}
      maxWidth={"100%"}
      minHeight={"200px"}
    >
      <ChakraTable.Root
        size={"sm"}
        overflow={"unset"}
        style={{
          ...columnSizeVars,
          width: table.getTotalSize(),
        }}
        stickyHeader
      >
        <ChakraTable.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <ChakraTable.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <ChakraTable.ColumnHeader
                  key={header.id}
                  py={1.5}
                  bg={"bg.muted"}
                  fontWeight={600}
                  style={{
                    width: `calc(var(--header-${header.id}-size) * 1px)`,
                  }}
                >
                  <HStack gap={0}>
                    <Box cursor="pointer" flex={1}>
                      <HStack>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <BiSort />
                      </HStack>
                    </Box>
                    <Box>
                      <IconButton
                        rounded="full"
                        variant="ghost"
                        size="2xs"
                        bg="transparent"
                        css={{
                          _icon: {
                            width: "3.5",
                            height: "3.5",
                          },
                        }}
                      >
                        <IoFilter />
                      </IconButton>
                    </Box>
                  </HStack>
                </ChakraTable.ColumnHeader>
              ))}
            </ChakraTable.Row>
          ))}
        </ChakraTable.Header>
        <ChakraTable.Body>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <ChakraTable.Row key={`skeleton-${rowIndex}`}>
              {table.getAllColumns().map((column, cellIndex) => (
                <ChakraTable.Cell
                  key={`skeleton-cell-${rowIndex}-${cellIndex}`}
                  style={{
                    width: `calc(var(--col-${column.id}-size) * 1px)`,
                  }}
                >
                  <Skeleton height="20px" />
                </ChakraTable.Cell>
              ))}
            </ChakraTable.Row>
          ))}
        </ChakraTable.Body>
      </ChakraTable.Root>
    </ChakraTable.ScrollArea>
  );
}
