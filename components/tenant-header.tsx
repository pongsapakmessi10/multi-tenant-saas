'use client'

import { useTenant } from './tenant-provider'
import { ShoppingCart, User, Menu } from 'lucide-react'
import { useState } from 'react'

export default function TenantHeader() {
  const { tenant } = useTenant()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            {tenant.logo_url ? (
              <img
                src={tenant.logo_url}
                alt={`${tenant.name} logo`}
                className="h-8 w-8 rounded"
              />
            ) : (
              <div
                className="h-8 w-8 rounded flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: tenant.primary_color || '#3b82f6' }}
              >
                {tenant.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="ml-2 text-xl font-bold text-gray-900">
              {tenant.name}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#products"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 p-2">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-900 p-2">
              <User className="h-5 w-5" />
            </button>
            <button
              className="px-4 py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: tenant.primary_color || '#3b82f6' }}
            >
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>
              <a
                href="#products"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Products
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </a>
              <div className="flex items-center space-x-4 pt-4">
                <button className="text-gray-600 hover:text-gray-900 p-2">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-900 p-2">
                  <User className="h-5 w-5" />
                </button>
                <button
                  className="px-4 py-2 rounded-md text-sm font-medium text-white"
                  style={{ backgroundColor: tenant.primary_color || '#3b82f6' }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
