import { DataTable } from "@/components/ui/data-table"

interface ServerDataTableProps<TData, TValue> {
  columns: any
  data: TData[]
  searchKey?: keyof TData
}

export function ServerDataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: ServerDataTableProps<TData, TValue>) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey={searchKey}
      disableLocalPagination={true}
      disableLocalSearch={true}
    />
  )
}
