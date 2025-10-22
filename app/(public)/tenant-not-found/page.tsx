import Link from 'next/link'
import { Globe, ArrowLeft, Home } from 'lucide-react'

export default function TenantNotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Tenant Not Found
        </h1>
        
        <p className="text-gray-600 mb-6">
          The subdomain you're looking for doesn't exist or has been removed.
          Please check the URL and try again.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Go to Homepage
          </Link>
          
          <Link
            href="/register"
            className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Create New Tenant
          </Link>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact support or check out our{' '}
            <Link href="/admin" className="text-blue-600 hover:text-blue-700">
              admin panel
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
