"use client"

import type React from "react"

import { useSelector } from "react-redux"
import { Shield, ShieldX, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { RootState } from "@/store/store"

const isAdmin = (s: string) => {
  if (s === "ADMIN") {
    return true
  }
  return false
}

interface AdminPermissionProps {
  children: React.ReactNode
}

const AdminPermission: React.FC<AdminPermissionProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user)

  if (isAdmin(user.role)) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="p-8 text-center">
          {/* Icon */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldX className="w-10 h-10 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Access Restricted</h1>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            You don't have the necessary permissions to access this area. Please contact your administrator if you
            believe this is an error.
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            Admin Access Required
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Current Role: <span className="font-medium text-gray-700">{user.role || "Guest"}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminPermission
