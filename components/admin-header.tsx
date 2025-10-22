'use client'

import Link from 'next/link'
import { Globe, Settings, Users, BarChart3 } from 'lucide-react'

export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              MultiTenant SaaS
            </span>
            <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Admin
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link
              href="/admin"
              className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <Link
              href="/admin/tenants"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Users className="h-4 w-4 mr-1" />
              Tenants
            </Link>
            <Link
              href="/admin/settings"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Create Tenant
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
