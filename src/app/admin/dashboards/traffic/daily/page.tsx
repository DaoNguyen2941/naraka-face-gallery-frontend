import StatsCharts from "../../../components/statsChart"

export default function AdminHome() {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Chào mừng đến trang quản trị</h1>
      </div>
      <hr className="my-4 border-muted" />
      <StatsCharts />
    </div>
  )
}
