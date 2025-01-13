import { BasicDatePicker } from "@/components/custom-ui/datepicker";
import { StatLabel, StatRoot, StatValueText } from "@/components/ui/stat";
import { Box, Table } from "@chakra-ui/react";
import { useState } from "react";

export function Settings() {
  const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
  ];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <>
      <StatRoot mb={2}>
        <StatLabel>Selected Date</StatLabel>
        <StatValueText>{selectedDate}</StatValueText>
      </StatRoot>
      <Box mb={2}>
        <BasicDatePicker onTextChange={setSelectedDate} />
      </Box>
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
    </>
  );
}
