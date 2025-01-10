import { DataTable, SkeltonDataTable } from "@/components/custom-ui/datatable";
import { useColumns } from "../../hooks/useColumns";
import { useUsers } from "../../hooks/useUsers";

export function Users() {
  const { data: users, isFetching, error } = useUsers();
  const columns = useColumns();
  if (error) return <div>Error occurred</div>;

  return (
    <>
      {isFetching ? (
        <SkeltonDataTable
          columns={columns}
          rowCount={20}
          height="calc(100vh - 280px)"
        />
      ) : (
        <DataTable
          data={users}
          columns={columns}
          height="calc(100vh - 280px)"
        />
      )}
    </>
  );
}
