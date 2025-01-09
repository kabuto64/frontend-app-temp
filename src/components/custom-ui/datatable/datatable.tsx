import { useCallback, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
  ColumnDef,
  SortDirection,
  ColumnFiltersState,
  getFilteredRowModel,
  Header,
  Row,
  Table,
} from "@tanstack/react-table";
import { Box, HStack, Table as ChakraTable } from "@chakra-ui/react";
import { BiSort } from "react-icons/bi";
import { FilterPopover } from "./filter";
import { EmptyState } from "@/components/ui/empty-state";
import { PiEmptyBold } from "react-icons/pi";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { filterByArray } from "@/libs/tanstack/table/filterFns";
// 型定義
type BaseRecord = { id: string | number };
type SortIconProps = { sortDir: false | SortDirection };
type TableHeaderProps<T extends BaseRecord> = {
  header: Header<T, unknown>;
  table: Table<T>;
  data: T[];
};
type TableRisizeProps<T extends BaseRecord> = {
  header: Header<T, unknown>;
};
type TableBodyProps<T extends BaseRecord> = {
  rows: Row<T>[];
  columns: number;
  selectedRowId: T["id"] | null;
  onRowClick: (id: T["id"]) => void;
};

// ソートアイコンコンポーネント
const SortIcon = ({ sortDir }: SortIconProps) => {
  if (sortDir === false) return <BiSort color="gray.400" />;
  return sortDir === "asc" ? (
    <Box color="cyan.focusRing">
      <FaArrowUpLong />
    </Box>
  ) : (
    <Box color="cyan.focusRing">
      <FaArrowDownLong />
    </Box>
  );
};

// テーブルヘッダーセル
const TableHeaderCell = <T extends BaseRecord>({
  header,
  data,
}: TableHeaderProps<T>) => {
  const handleFilterChange = useCallback(
    (filterFn: any[]) => {
      header.column.setFilterValue(filterFn);
    },
    [header.column]
  );
  return (
    <ChakraTable.ColumnHeader
      py={1.5}
      bg={"bg.muted"}
      fontWeight={600}
      _hover={{ bg: "bg.emphasized" }}
      position="relative"
      style={{
        width: `calc(var(--header-${header.id}-size) * 1px)`,
        userSelect: "none",
      }}
    >
      <HStack gap={0}>
        <Box
          cursor="pointer"
          onClick={header.column.getToggleSortingHandler()}
          flex={1}
        >
          <HStack>
            {flexRender(header.column.columnDef.header, header.getContext())}
            <SortIcon sortDir={header.column.getIsSorted()} />
          </HStack>
        </Box>

        <Box>
          <FilterPopover
            column={header.column}
            data={data}
            onFilterChange={handleFilterChange}
          />
        </Box>
      </HStack>
      <ResizeHandle header={header} />
    </ChakraTable.ColumnHeader>
  );
};

// リサイズハンドル
const ResizeHandle = <T extends BaseRecord>({
  header,
}: TableRisizeProps<T>) => (
  <Box
    position="absolute"
    right={0}
    top={0}
    bottom={0}
    width="4px"
    cursor="col-resize"
    userSelect="none"
    onDoubleClick={() => header.column.resetSize()}
    onMouseDown={header.getResizeHandler()}
    onTouchStart={header.getResizeHandler()}
    _hover={{
      bg: "bg.alpha",
    }}
    _active={{
      bg: "bg.alpha",
    }}
  />
);

// テーブルボディ
const TableBodyContent = <T extends BaseRecord>({
  rows,
  columns,
  selectedRowId,
  onRowClick,
}: TableBodyProps<T>) => {
  if (rows.length === 0) {
    return (
      <ChakraTable.Row>
        <ChakraTable.Cell
          colSpan={columns}
          borderStyle={"none"}
          textAlign="center"
          py={8}
        >
          <EmptyState
            icon={<PiEmptyBold />}
            title="Table is empty"
            description="Explore our products and add items to your cart"
          />
        </ChakraTable.Cell>
      </ChakraTable.Row>
    );
  }

  return rows.map((row) => (
    <ChakraTable.Row
      key={row.id}
      onClick={() => onRowClick(row.original.id)}
      data-selected={selectedRowId === row.original.id ? "" : undefined}
      cursor="pointer"
    >
      {row.getVisibleCells().map((cell) => (
        <ChakraTable.Cell
          key={cell.id}
          style={{
            width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </ChakraTable.Cell>
      ))}
    </ChakraTable.Row>
  ));
};

// メインのテーブルコンポーネント
export function DataTable<T extends BaseRecord>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnDef<T>[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRowId, setSelectedRowId] = useState<T["id"] | null>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnFilters: true,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    columnResizeMode: "onChange",
    filterFns: { filterByArray },
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
      height="500px"
      maxWidth={"100%"}
    >
      <ChakraTable.Root
        size={"sm"}
        overflow={"unset"}
        style={{
          ...columnSizeVars,
          width: table.getTotalSize(),
        }}
        interactive
        stickyHeader
      >
        <ChakraTable.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <ChakraTable.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeaderCell
                  key={header.id}
                  header={header}
                  table={table}
                  data={memoizedData}
                />
              ))}
            </ChakraTable.Row>
          ))}
        </ChakraTable.Header>
        <ChakraTable.Body>
          <TableBodyContent
            rows={table.getRowModel().rows}
            columns={table.getAllColumns().length}
            selectedRowId={selectedRowId}
            onRowClick={setSelectedRowId}
          />
        </ChakraTable.Body>
      </ChakraTable.Root>
    </ChakraTable.ScrollArea>
  );
}
