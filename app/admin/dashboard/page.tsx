import type { Metadata } from "next"
import AdminSidebar from "@/app/components/admin/dashboard/AdminSidebar"
import DashboardHeader from "@/app/components/admin/dashboard/DashboardHeader"
import DashboardStats from "@/app/components/admin/dashboard/DashboardStats"
import QuickActions from "@/app/components/admin/dashboard/QuickActions"
import RecentContent from "@/app/components/admin/dashboard/RecentContent"

export const metadata: Metadata = {
  title: "Dashboard | Spero Admin",
  description: "Manage Spero website content from the admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <AdminSidebar />

      <div className="min-w-0 lg:pl-[240px]">
        <DashboardHeader />

        <main className="mx-auto w-full max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section aria-labelledby="welcome-heading">
            <h2
              id="welcome-heading"
              className="text-[22px] font-bold tracking-tight text-[#14213D] sm:text-[24px]"
            >
              Welcome back, Admin
            </h2>
            <p className="mt-1 text-[13px] text-[#526786]">
              Here&apos;s an overview of your Spero website content.
            </p>
          </section>

          <DashboardStats />
          <QuickActions />
          <RecentContent />
        </main>
      </div>
    </div>
  )
}
