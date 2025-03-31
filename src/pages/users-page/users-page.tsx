import { Alert, Box } from "@mui/material";
import { useGetUsersQuery } from "../../entities/users/api/service"
import { useRowCount } from "../../shared/lib/use-row-count";
import { DataGrid } from "@mui/x-data-grid";
import { colums } from "./lib/colums";

export function UsersPage() {

  const { data, isLoading, error, isFetching } = useGetUsersQuery();

  const rowCount = useRowCount(data?.length);

  if (!data || error) {
    return <Alert color="error">Network error</Alert>
  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <DataGrid
        rows={data}
        // rowCount={rowCount}
        columns={colums}
        loading={isLoading || isFetching}
      />
    </Box>
  )
}
