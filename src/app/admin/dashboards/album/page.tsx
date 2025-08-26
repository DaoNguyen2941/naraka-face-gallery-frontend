import AlbumTable from "./compoments/albumTable"
export default function CharacterManagementPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quản lý album</h2>
      <AlbumTable/>
    </div>
  )
}
