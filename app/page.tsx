import Link from 'next/link'
import { ArrowRight, CheckCircle, Globe, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                MultiTenant SaaS
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/register"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </Link>
              <Link
                href="/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Own
            <span className="text-blue-600"> Multi-Tenant</span>
            <br />
            SaaS Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create a complete multi-tenant SaaS platform with custom subdomains,
            tenant isolation, and modern architecture. Built with Next.js 14,
            Supabase, and deployed on Vercel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A complete multi-tenant SaaS platform with all the features you need
            to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Custom Subdomains
            </h3>
            <p className="text-gray-600">
              Each tenant gets their own subdomain like alice.yoursite.com
              with automatic routing and tenant isolation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tenant Isolation
            </h3>
            <p className="text-gray-600">
              Complete data isolation between tenants with Row Level Security
              and proper database architecture.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Modern Stack
            </h3>
            <p className="text-gray-600">
              Built with Next.js 14, Supabase, TypeScript, and Tailwind CSS
              for a modern, scalable architecture.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try the Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check out our demo tenants to see the platform in action.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl border border-red-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Alice Company
              </h3>
              <p className="text-gray-600 mb-4">
                A sample e-commerce store with premium widgets.
              </p>
              <Link
                href="https://alice.fluke.xyz"
                className="text-red-600 hover:text-red-700 font-medium inline-flex items-center"
              >
                Visit alice.fluke.xyz
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Bob Enterprises
              </h3>
              <p className="text-gray-600 mb-4">
                Enterprise solutions and business software.
              </p>
              <Link
                href="https://bob.fluke.xyz"
                className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
              >
                Visit bob.fluke.xyz
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Demo Store
              </h3>
              <p className="text-gray-600 mb-4">
                A general demo store showcasing the platform.
              </p>
              <Link
                href="https://demo.fluke.xyz"
                className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
              >
                Visit demo.fluke.xyz
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Create your own multi-tenant SaaS platform in minutes with our
            complete template.
          </p>
          <Link
            href="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Create Your Tenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">MultiTenant SaaS</span>
            </div>
            <p className="text-gray-400">
              Built with Next.js 14, Supabase, and deployed on Vercel
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
