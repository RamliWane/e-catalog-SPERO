import type { Metadata } from "next"
import AdminSidebar from "@/app/components/admin/dashboard/AdminSidebar"
import UserManagementContent from "@/app/components/admin/user/UserManagementContent"

export const metadata: Metadata = {
  title: "User Management | Spero Admin",
  description: "Manage user accounts and monitor their account status.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminUserPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <AdminSidebar />

      <div className="min-w-0 lg:pl-[240px]">
        <UserManagementContent />
      </div>
    </div>
  )
}
