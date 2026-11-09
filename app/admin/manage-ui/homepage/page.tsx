import type { Metadata } from "next"
import AdminSidebar from "@/app/components/admin/dashboard/AdminSidebar"
import HomepageEditor from "@/app/components/admin/manage-ui/HomepageEditor"
import ManageUIHeader from "@/app/components/admin/manage-ui/ManageUIHeader"

export const metadata: Metadata = {
  title: "Homepage Editor | Spero Admin",
  description:
    "Manage homepage sections, content, ordering, and visibility.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminHomepageEditorPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <AdminSidebar />

      <div className="min-w-0 lg:pl-[240px]">
        <ManageUIHeader
          breadcrumb={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Manage UI" },
            { label: "Homepage" },
          ]}
          title="Homepage Editor"
          description="Manage homepage sections, content, ordering, and visibility."
          badge="Local Session Only"
        />

        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <HomepageEditor />
        </main>
      </div>
    </div>
  )
}
