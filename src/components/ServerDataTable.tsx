import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

interface ServerDataTableProps<TData> {
  columns: ColumnDef<TData>[] 
  data: TData[]
  searchKey?: keyof TData
}

export function ServerDataTable<TData>({
  columns,
  data,
  searchKey,
}: ServerDataTableProps<TData>) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey={searchKey}
      disableLocalPagination
      disableLocalSearch
    />
  )
}

