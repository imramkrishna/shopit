"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { FaShoppingBag, FaHourglassHalf, FaCashRegister, FaChartLine } from 'react-icons/fa'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, AreaChart, Area, PieChart, Pie, ResponsiveContainer
} from 'recharts'

const Page = () => {
  const { user, loading } = useAuth()
  const [stats] = useState({
    totalOrders: 150,
    pendingOrders: 42,
    totalSale: 320,
    totalRevenue: '₹1.2M'
  })

  const lineData = [
    { name: 'Jan', TotalSales: 400, NetSales: 240 },
    { name: 'Feb', TotalSales: 300, NetSales: 456 },
    { name: 'Mar', TotalSales: 200, NetSales: 139 },
    { name: 'Apr', TotalSales: 278, NetSales: 390 },
  ]
  const barData = lineData
  const areaData = lineData
  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  // redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) window.location.href = '/seller/login'
  }, [user, loading])

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="w-full px-4 sm:px-6 mt-16 md:mt-24 pb-8 overflow-x-hidden">
      {/* Page Heading */}
      <header className="mb-6 md:mb-8 flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Dashboard</h1>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        {[
          {
            label: 'Total Orders',
            value: stats.totalOrders,
            icon: <FaShoppingBag className="text-3xl md:text-4xl text-white opacity-30" />,
            bg: 'bg-teal-600'
          },
          {
            label: 'Pending Orders',
            value: stats.pendingOrders,
            icon: <FaHourglassHalf className="text-3xl md:text-4xl text-white opacity-30" />,
            bg: 'bg-red-600'
          },
          {
            label: 'Total Sale',
            value: stats.totalSale,
            icon: <FaCashRegister className="text-3xl md:text-4xl text-white opacity-30" />,
            bg: 'bg-yellow-600'
          },
          {
            label: 'Total Revenue',
            value: stats.totalRevenue,
            icon: <FaChartLine className="text-3xl md:text-4xl text-white opacity-30" />,
            bg: 'bg-green-600'
          },
        ].map(({ label, value, icon, bg }) => (
          <div key={label} className={`${bg} rounded-lg shadow p-4 md:p-6 flex items-center justify-between`}>
            <div>
              <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
              <p className="mt-1 text-xs md:text-sm text-white">{label}</p>
            </div>
            {icon}
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Line Chart */}
        <section className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="mb-4 text-lg md:text-xl font-semibold text-gray-700">Sales Over Time</h2>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis /> 
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="TotalSales" stroke="#38bdf8" strokeWidth={2} />
                <Line type="monotone" dataKey="NetSales" stroke="#34d399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Bar Chart */}
        <section className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="mb-4 text-lg md:text-xl font-semibold text-gray-700">Monthly Volume</h2>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="TotalSales" fill="#38bdf8" />
                <Bar dataKey="NetSales" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Area Chart */}
        <section className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="mb-4 text-lg md:text-xl font-semibold text-gray-700">Trend Overview</h2>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorTotalSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="TotalSales" stroke="#38bdf8" fill="url(#colorTotalSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Pie Chart */}
        <section className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="mb-4 text-lg md:text-xl font-semibold text-gray-700">Category Shares</h2>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#38bdf8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
