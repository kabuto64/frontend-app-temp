import { Column } from "@tanstack/react-table";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { IoFilter } from "react-icons/io5";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Box, IconButton, Input, Stack } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { LuSearch } from "react-icons/lu";
import { FaFilter } from "react-icons/fa6";

type FilterPopoverProps<T> = {
  column: Column<T>;
  data: T[];
  onFilterChange: (values: any[]) => void;
};

// 検索用のフィルター関数を外部に切り出し
const filterValuesBySearch = (values: any[], searchText: string) => {
  if (!searchText) return values;
  const lowercaseSearch = searchText.toLowerCase();
  return values.filter((value) =>
    String(value).toLowerCase().includes(lowercaseSearch)
  );
};

// チェックボックスコンポーネントを分離
const FilterCheckbox = memo(
  ({
    value,
    isSelected,
    onChange,
    indent = false,
    isIndeterminate = false,
  }: {
    value: any;
    isSelected: boolean;
    onChange: (checked: boolean) => void;
    indent?: boolean;
    isIndeterminate?: boolean;
  }) => (
    <Checkbox
      size="sm"
      checked={isIndeterminate ? "indeterminate" : isSelected}
      onCheckedChange={({ checked }) => onChange(checked as boolean)}
      ml={indent ? 2 : 0}
    >
      {String(value)}
    </Checkbox>
  )
);

FilterCheckbox.displayName = "FilterCheckbox";

function FilterPopoverComponent<T>({
  column,
  data,
  onFilterChange,
}: FilterPopoverProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  // ユニークな値の抽出をメモ化
  const uniqueValues = useMemo(() => {
    const values = new Set<any>();
    data.forEach((row) => {
      const value = row[column.id as keyof T];
      if (value != null) {
        values.add(value);
      }
    });
    return Array.from(values);
  }, [data, column.id]);

  // 選択された値の状態管理
  const [selectedValues, setSelectedValues] = useState<Set<any>>(
    () => new Set(uniqueValues)
  );

  // フィルタリングされた値をメモ化
  const filteredValues = useMemo(
    () => filterValuesBySearch(uniqueValues, searchText),
    [uniqueValues, searchText]
  );

  // 選択状態の更新をメモ化
  const updateSelection = useCallback(
    (newSelected: Set<any>) => {
      setIsFiltered(newSelected.size !== uniqueValues.length);
      setSelectedValues(newSelected);
      onFilterChange(Array.from(newSelected));
    },
    [uniqueValues.length, onFilterChange]
  );

  // チェックボックスの変更ハンドラをメモ化
  const handleCheckboxChange = useCallback(
    (value: any, checked: boolean) => {
      const newSelected = new Set(selectedValues);
      if (checked) {
        newSelected.add(value);
      } else {
        newSelected.delete(value);
      }
      updateSelection(newSelected);
    },
    [selectedValues, updateSelection]
  );

  // 全選択/解除ハンドラをメモ化
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const newSelected = new Set(selectedValues);
      filteredValues.forEach((value) => {
        if (checked) {
          newSelected.add(value);
        } else {
          newSelected.delete(value);
        }
      });
      updateSelection(newSelected);
    },
    [selectedValues, filteredValues, updateSelection]
  );

  // 選択状態の計算をメモ化
  const selectionState = useMemo(() => {
    const allSelected =
      filteredValues.length > 0 &&
      filteredValues.every((value) => selectedValues.has(value));
    const someSelected =
      !allSelected && filteredValues.some((value) => selectedValues.has(value));
    return { isAllSelected: allSelected, isIndeterminate: someSelected };
  }, [filteredValues, selectedValues]);

  // データ更新時の選択状態リセット
  useEffect(() => {
    setSelectedValues(new Set(uniqueValues));
  }, [uniqueValues]);

  return (
    <PopoverRoot positioning={{ placement: "bottom-start" }}>
      <PopoverTrigger asChild>
        <IconButton
          rounded="full"
          variant="ghost"
          size="2xs"
          bg="transparent"
          onClick={(e) => e.stopPropagation()}
          _hover={{
            bg: {
              _dark: "whiteAlpha.300",
              _light: "blackAlpha.300",
            },
          }}
          css={{
            _icon: {
              width: "3.5",
              height: "3.5",
            },
          }}
        >
          {isFiltered ? (
            <Box color="cyan.focusRing">
              <FaFilter />
            </Box>
          ) : (
            <IoFilter />
          )}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent width="250px" onClick={(e) => e.stopPropagation()}>
        <PopoverBody>
          <Stack gap={3}>
            <InputGroup flex="1" startElement={<LuSearch />}>
              <Input
                size="sm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </InputGroup>

            <Stack maxHeight="200px" overflowY="auto">
              <FilterCheckbox
                value="Select All"
                isSelected={selectionState.isAllSelected}
                onChange={(checked) => handleSelectAll(checked)}
                indent={false}
                isIndeterminate={selectionState.isIndeterminate}
              />
              {filteredValues.map((value) => (
                <FilterCheckbox
                  key={String(value)}
                  value={value}
                  isSelected={selectedValues.has(value)}
                  onChange={(checked) => handleCheckboxChange(value, checked)}
                  indent={true}
                />
              ))}
            </Stack>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
export const FilterPopover = memo(
  FilterPopoverComponent
) as typeof FilterPopoverComponent;
