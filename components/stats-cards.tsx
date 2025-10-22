'use client'

import { Users, Building2, Package, TrendingUp } from 'lucide-react'

interface StatsCardsProps {
  totalTenants: number
  totalUsers: number
  totalProducts: number
}

export default function StatsCards({ totalTenants, totalUsers, totalProducts }: StatsCardsProps) {
  const stats = [
    {
      name: 'Total Tenants',
      value: totalTenants,
      icon: Building2,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      name: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      name: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-purple-500',
      change: '+23%',
      changeType: 'positive' as const,
    },
    {
      name: 'Growth Rate',
      value: '15%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+2%',
      changeType: 'positive' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className={`${stat.color} rounded-lg p-3`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span
              className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      ))}
    </div>
  )
}
