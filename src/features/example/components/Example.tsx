import { EmptyState } from "@/components/ui/empty-state";
import { Tabs } from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { LuFolder, LuUser } from "react-icons/lu";
import { BiCommentError } from "react-icons/bi";
import { DataTable } from "@/components/datatable";
import { Table } from "@chakra-ui/react";
import { useColumns } from "../hooks/useColumns";
import { useUsers } from "../hooks/useUsers";
import { Title } from "@/components/title";

export function Example() {
  const { data: users, isFetching , error } = useUsers();
  const columns = useColumns();
  if (isFetching ) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <>
      <Title title="Example" description="This is a ExamplePage" />
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
          <DataTable data={users} columns={columns} />
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
