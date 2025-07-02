'use client'

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts'

const dailyViews = [
  { date: 'T2', views: 120 },
  { date: 'T3', views: 220 },
  { date: 'T4', views: 180 },
  { date: 'T5', views: 320 },
  { date: 'T6', views: 290 },
  { date: 'T7', views: 150 },
  { date: 'CN', views: 400 },
]

const popularPages = [
  { path: '/characters', views: 200 },
  { path: '/media', views: 150 },
  { path: '/about', views: 90 },
]

const deviceStats = [
  { name: 'Desktop', value: 60 },
  { name: 'Mobile', value: 40 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function StatsCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Lượt truy cập theo ngày - full width */}
      <div className="md:col-span-3 bg-white p-4 rounded-xl shadow border">
        <h3 className="text-lg font-semibold mb-2 text-black">Lượt truy cập theo ngày</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyViews}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trang phổ biến - 2/3 chiều rộng */}
      <div className="md:col-span-2 bg-white p-4 rounded-xl shadow border">
        <h3 className="text-lg font-semibold mb-2 text-black">Trang phổ biến</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={popularPages}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="path" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tỷ lệ thiết bị - 1/3 chiều rộng */}
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
              label={({ name, percent }) => percent !== undefined ? `${name}: ${(percent * 100).toFixed(0)}%` : name}
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
