import CharacterTable from "./components/CharacterTable"
export default function CharacterManagementPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quản lý nhân vật</h2>
      <CharacterTable />
    </div>
  )
}
