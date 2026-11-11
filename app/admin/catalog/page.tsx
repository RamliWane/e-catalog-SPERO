import type { Metadata } from "next"
import AdminSidebar from "@/app/components/admin/dashboard/AdminSidebar"
import CatalogAdmin from "@/app/components/admin/catalog/CatalogAdmin"
import { getCatalogAdminData } from "@/lib/catalog-db"

export const metadata: Metadata = {
  title: "Catalog Management | Spero Admin",
  description: "Manage and organize the Spero website catalog.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminCatalogPage() {
  const { items, categories } = await getCatalogAdminData()

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <AdminSidebar />
      <CatalogAdmin initialItems={items} initialCategories={categories} />
    </div>
  )
}
