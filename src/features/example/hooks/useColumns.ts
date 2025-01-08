import { ColumnDef } from "@tanstack/react-table";
import { User } from "../types";
import { filterByArray } from "@/libs/tanstack/table/filterFns";
import { useMemo } from "react";

export const useColumns = () => {
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "id",
        minSize: 70,
        maxSize: 70,
        filterFn: filterByArray,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        minSize: 120,
        filterFn: filterByArray,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        minSize: 120,
        filterFn: filterByArray,
      },
      {
        accessorKey: "email",
        header: "Email",
        minSize: 200,
        size: 300,
        filterFn: filterByArray,
      },
      {
        accessorKey: "role",
        header: "Role",
        minSize: 100,
        filterFn: filterByArray,
      },
      {
        accessorKey: "department",
        header: "Department",
        minSize: 120,
        filterFn: filterByArray,
      },
      {
        accessorKey: "status",
        header: "Status",
        minSize: 100,
        filterFn: filterByArray,
      },
      {
        accessorKey: "joinDate",
        header: "Join Date",
        minSize: 120,
        filterFn: filterByArray,
      },
      {
        accessorKey: "lastLogin",
        header: "Last Login",
        minSize: 180,
        filterFn: filterByArray,
      },
      {
        accessorKey: "salary",
        header: "Salary",
        minSize: 100,
        filterFn: filterByArray,
      },
    ],
    []
  );
  return columns;
};
