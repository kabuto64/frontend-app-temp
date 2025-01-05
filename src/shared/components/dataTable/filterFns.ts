import { FilterFn } from "@tanstack/react-table";

// 選択された値のいずれかに一致する行をフィルタリング
export const filterByArray: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue || filterValue.length === 0) return false; // フィルタなし
  return filterValue.includes(row.getValue(columnId));
};
