import AdminHeader from '@/components/admin-header'
import StatsCards from '@/components/stats-cards'

export default async function AdminPage() {
  // Simplified for now - will implement proper data fetching later
  const totalTenants = 0
  const totalUsers = 0
  const totalProducts = 0
  const tenantsList: any[] = []

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards 
          totalTenants={totalTenants}
          totalUsers={totalUsers}
          totalProducts={totalProducts}
        />

        {/* Tenants Table */}
        <div className="mt-8">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">All Tenants</h2>
              <p className="text-sm text-gray-600">
                Manage all tenants in your multi-tenant SaaS platform
              </p>
            </div>
            
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Panel</h3>
              <p className="text-gray-600">
                Tenant management will be available once the database is set up.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
