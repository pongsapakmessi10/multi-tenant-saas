import { headers } from 'next/headers'
import { getTenantContext } from '@/lib/tenant'
import { TenantProvider } from '@/components/tenant-provider'

export default async function TenantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const tenantContext = await getTenantContext(host)

  // This should not happen due to middleware, but just in case
  if (!tenantContext.tenant) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tenant Not Found
          </h1>
          <p className="text-gray-600">
            The subdomain you're looking for doesn't exist.
          </p>
          <a 
            href="/" 
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Main Site
          </a>
        </div>
      </div>
    )
  }

  return (
    <TenantProvider tenant={tenantContext.tenant}>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </TenantProvider>
  )
}
