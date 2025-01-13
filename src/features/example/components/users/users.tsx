import { DataTable } from "@/components/custom-ui/datatable";
import { useColumns } from "../../hooks/useColumns";
import { useUsers } from "../../hooks/useUsers";

export function Users() {
  const { data: users, isFetching, error } = useUsers();
  const columns = useColumns();
  if (error) return <div>Error occurred</div>;

  return (
    <>
      <DataTable
        data={users}
        columns={columns}
        height="calc(100vh - 280px)"
        width="100%"
        isFetching={isFetching}
        dummyItemLength={20}
      />
    </>
  );
}
