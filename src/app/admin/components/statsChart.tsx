'use client'

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts'
import { useAdminAnalyticTraffic } from '../hooks/useAdminTraffic'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { TrafficByDay } from '@/types'

const deviceStats = [
  { name: 'Desktop', value: 60 },
  { name: 'Mobile', value: 40 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

function formatDate(date: Date) {
  return date.toISOString().split("T")[0]
}

/**
 * Lấy giá trị pageviews với fallback cho cả `pageviews` hoặc `pageViews`
 * để tránh lỗi do khác tên trường giữa backend / frontend.
 */
function getPageViews(traffic: Partial<TrafficByDay>) {
  return (traffic as any).pageviews ?? (traffic as any).pageViews ?? 0
}

function transformTrafficToPopularPages(current: Partial<TrafficByDay>, baseline: Partial<TrafficByDay>) {
  const currentPageviews = getPageViews(current)
  const baselinePageviews = getPageViews(baseline)

  const currentNewVisitor = current?.new_visitor ?? 0
  const baselineNewVisitor = baseline?.new_visitor ?? 0

  const currentSessions = current?.sessions ?? 0
  const baselineSessions = baseline?.sessions ?? 0

  const currentUnique = current?.unique_visitors ?? 0
  const baselineUnique = baseline?.unique_visitors ?? 0

  return [
    { metric: "New Visitor", value: currentNewVisitor, baseline: baselineNewVisitor },
    { metric: "Page Views", value: currentPageviews, baseline: baselinePageviews },
    { metric: "Sessions", value: currentSessions, baseline: baselineSessions },
    { metric: "Unique Visitors", value: currentUnique, baseline: baselineUnique },
  ]
}

/**
 * CustomTooltip: an toàn với nhiều dạng payload.
 * payload có thể là [{ payload: { ... } }] hoặc [{ value, name, payload }].
 */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

  const entry = payload[0]
  const item = entry.payload ?? entry

  const baseline = typeof item.baseline === 'number' ? item.baseline : 0
  const value = typeof item.value === 'number' ? item.value : Number(item.value ?? 0)

  const diff = value - baseline
  const percent = baseline ? ((diff / baseline) * 100) : null
  const isIncrease = diff >= 0

  return (
    <div className="bg-white p-3 border rounded shadow text-sm text-black">
      <div className="font-semibold mb-1">{item.metric ?? label}</div>
      <div className="text-sm">Giá trị: <span className="font-medium">{value}</span></div>

      <div className="text-sm">
        So với ngày đầu:
        {baseline === 0 ? (
          <span className="ml-1 text-gray-500">Không có baseline</span>
        ) : (
          <span className={`ml-1 font-medium ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
            {isIncrease ? '▲' : '▼'} {Math.abs(percent ?? 0).toFixed(2)}%
            <span className="text-gray-500 ml-2">({diff >= 0 ? '+' : ''}{diff})</span>
          </span>
        )}
      </div>
    </div>
  )
}


export default function StatsCharts() {
  const today = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(today.getDate() - 7)

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<string>(formatDate(sevenDaysAgo))
  const [endDate, setEndDate] = useState<string>(formatDate(today))

  const { data: analyticTraffic = [], isLoading } = useAdminAnalyticTraffic({
    start: startDate,
    end: endDate,
  })

  // dateData chứa metric/value/baseline để vẽ BarChart
  const [dateData, setDateData] = useState<
    { metric: string; value: number; baseline: number }[]
  >([])

  useEffect(() => {
    if (analyticTraffic.length > 0) {
      const baseline = analyticTraffic[0]
      const last = analyticTraffic[analyticTraffic.length - 1]

      if (selectedDate == null) {
        setSelectedDate(last.date)
        setDateData(transformTrafficToPopularPages(last, baseline))
      }
    }
  }, [analyticTraffic, selectedDate,])


  const handleClickXAxis = (data: TrafficByDay | undefined, date: string) => {
    if (!analyticTraffic || analyticTraffic.length === 0) return
    if (!data) return
    const baseline = analyticTraffic[0]
    setSelectedDate(date)
    setDateData(transformTrafficToPopularPages(data, baseline))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Lượt truy cập theo ngày - full width */}
      <div className="md:col-span-3 bg-white p-4 rounded-xl shadow border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-black">Lượt truy cập</h3>
          <div className="flex items-center gap-2">
            <span className="text-black font-medium">Từ</span>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-40 text-black bg-white border border-gray-300"
            />
            <span className="text-black font-medium">Đến</span>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-40 text-black bg-white border border-gray-300"
            />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={analyticTraffic}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={({ x, y, payload }) => {
                // payload.index có thể undefined nếu ticks được generated khác
                const idx = typeof payload?.index === 'number' ? payload.index : -1
                const dataPoint = idx >= 0 ? analyticTraffic[idx] : undefined
                return (
                  <text
                    x={x}
                    y={y + 15}
                    textAnchor="middle"
                    fill={selectedDate === payload.value ? "red" : "#666"}
                    style={{ cursor: "pointer", userSelect: "none" }}
                    onClick={() => dataPoint && handleClickXAxis(dataPoint, payload.value)}
                  >
                    {payload.value}
                  </text>
                )
              }}
            />
            <YAxis />
            <Tooltip /> {/* tooltip mặc định cho LineChart (không liên quan đến BarChart tooltip) */}
            <Line type="monotone" dataKey="pageviews" stroke="#2f00ffff" strokeWidth={3} />
            <Line type="monotone" dataKey="sessions" stroke="#eeff00ff" strokeWidth={3} />
            <Line type="monotone" dataKey="new_visitor" stroke="#ff0000ff" strokeWidth={3} />
            <Line type="monotone" dataKey="unique_visitors" stroke="#000000ff" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chi tiết lưu lượng - 2/3 */}
      <div className="md:col-span-2 bg-white p-4 rounded-xl shadow border">
        <h3 className="text-lg font-semibold mb-2 text-black">Chi tiết lưu lượng {selectedDate ? `- ${selectedDate}` : ''}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tỷ lệ thiết bị - 1/3 */}
      <div className="bg-white p-4 rounded-xl shadow border">
        <h3 className="text-lg font-semibold mb-2 text-black">Tỷ lệ thiết bị</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={deviceStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              labelLine={false}
              label={({ name, percent }) =>
                percent !== undefined ? `${name}: ${(percent * 100).toFixed(0)}%` : name
              }
            >
              {deviceStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
