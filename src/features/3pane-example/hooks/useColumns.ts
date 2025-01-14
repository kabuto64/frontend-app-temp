import { ColumnDef } from "@tanstack/react-table";
import { Project, User } from "../types";
import { filterByArray } from "@/libs/tanstack/table/filterFns";
import { useMemo } from "react";

export const useProjectColumns = () => {
  const columns: ColumnDef<Project>[] = useMemo(
    () => [
      {
        accessorKey: "projectNumber",
        header: "Project Number",
        filterFn: filterByArray,
      },
      {
        accessorKey: "projectName",
        header: "Project Name",
        filterFn: filterByArray,
      },
      {
        accessorKey: "projectManager",
        header: "Project Manager",
        filterFn: filterByArray,
      },
      {
        accessorKey: "lastUpdated",
        header: "Last Updated",
        filterFn: filterByArray,
      },
    ],
    []
  );
  return columns;
};

export const useMasterColumns = () => {
  const columns: ColumnDef<User>[] = useMemo(
    () => [
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
    ],
    []
  );
  return columns;
};

export const useDatailColumns = () => {
  const columns: ColumnDef<User>[] = useMemo(
    () => [
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
