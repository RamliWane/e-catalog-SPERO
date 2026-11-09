import type { Metadata } from "next"
import AdminSidebar from "@/app/components/admin/dashboard/AdminSidebar"
import CatalogHeader from "@/app/components/admin/catalog/CatalogHeader"
import CatalogManager from "@/app/components/admin/catalog/CatalogManager"
import CatalogSummary from "@/app/components/admin/catalog/CatalogSummary"

export const metadata: Metadata = {
  title: "Catalog Management | Spero Admin",
  description: "Manage and organize the Spero website catalog.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminCatalogPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <AdminSidebar />

      <div className="min-w-0 lg:pl-[240px]">
        <CatalogHeader />

        <main className="mx-auto w-full max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <CatalogSummary />
          <CatalogManager />
        </main>
      </div>
    </div>
  )
}
