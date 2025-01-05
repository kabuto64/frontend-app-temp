import { EmptyState } from "@/shared/components/ui/empty-state";
import { Heading, Highlight, Stack, Text, Tabs } from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { LuFolder, LuUser } from "react-icons/lu";
import { BiCommentError } from "react-icons/bi";
import { useUsers } from "../hooks/useUsers";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../types/user";
import { DataTable } from "@/shared/components/dataTable/DataTable";
import { filterByArray } from "@/shared/components/dataTable/filterFns";
import { Table } from "@chakra-ui/react";

export function Example() {
  const { data: users, isLoading, error } = useUsers();
  const userColumns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
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
  ];
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <>
      <Stack gap={2} align={"flex-start"} mb={5}>
        <Heading size="3xl" letterSpacing="tight">
          <Highlight query="with speed" styles={{ color: "teal.600" }}>
            Create accessible React apps with speed
          </Highlight>
        </Heading>
        <Text fontSize="md" color="fg.muted">
          Chakra UI is a simple, modular and accessible component library that
          gives you the building blocks you need.
        </Text>
      </Stack>
      <Tabs.Root defaultValue="members">
        <Tabs.List>
          <Tabs.Trigger value="members">
            <LuUser />
            Members
          </Tabs.Trigger>
          <Tabs.Trigger value="projects">
            <LuFolder />
            Projects
          </Tabs.Trigger>
          <Tabs.Trigger value="tasks">
            <IoMdSettings />
            Settings
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="members">
          <DataTable data={users} columns={userColumns} />
        </Tabs.Content>
        <Tabs.Content value="projects">
          <EmptyState
            icon={<BiCommentError />}
            title="Your cart is empty"
            description="Explore our products and add items to your cart"
          />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <Table.ScrollArea borderWidth="1px" rounded="md" height="160px">
            <Table.Root size="sm" stickyHeader>
              <Table.Header>
                <Table.Row bg="bg.subtle">
                  <Table.ColumnHeader>Product</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {items.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.category}</Table.Cell>
                    <Table.Cell textAlign="end">{item.price}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
