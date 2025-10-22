'use client'

import { Tenant } from '@/lib/database.types'
import { formatDate } from '@/lib/utils'
import { ExternalLink, Edit, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

interface TenantTableProps {
  tenants: Tenant[]
}

export default function TenantTable({ tenants }: TenantTableProps) {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDelete = async (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedTenant) return

    try {
      const response = await fetch(`/api/tenants/${selectedTenant.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Refresh the page or update the tenants list
        window.location.reload()
      } else {
        console.error('Failed to delete tenant')
      }
    } catch (error) {
      console.error('Error deleting tenant:', error)
    } finally {
      setIsDeleteModalOpen(false)
      setSelectedTenant(null)
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subdomain
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {tenant.logo_url ? (
                      <img
                        src={tenant.logo_url}
                        alt={`${tenant.name} logo`}
                        className="h-8 w-8 rounded"
                      />
                    ) : (
                      <div
                        className="h-8 w-8 rounded flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: tenant.primary_color || '#3b82f6' }}
                      >
                        {tenant.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {tenant.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">
                    {tenant.subdomain}.fluke.xyz
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(tenant.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <a
                      href={`https://${tenant.subdomain}.fluke.xyz`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="View Site"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      className="text-gray-600 hover:text-gray-900 p-1"
                      title="Edit Tenant"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tenant)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete Tenant"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">
                Delete Tenant
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <strong>{selectedTenant.name}</strong>?
                  This action cannot be undone and will remove all associated data.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false)
                    setSelectedTenant(null)
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 mt-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
