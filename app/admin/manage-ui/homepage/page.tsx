import type { Metadata } from "next"
import AdminSidebar from "@/app/components/admin/dashboard/AdminSidebar"
import HomepageEditor from "@/app/components/admin/manage-ui/HomepageEditor"
import ManageUIHeader from "@/app/components/admin/manage-ui/ManageUIHeader"
import { getHomepageBrowse } from "@/lib/homepage-browse"
import { getHomepageHero } from "@/lib/homepage-hero"

export const metadata: Metadata = {
  title: "Homepage Editor | Spero Admin",
  description:
    "Manage homepage sections, content, and visibility with Hero and Browse database persistence.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminHomepageEditorPage() {
  const [hero, browse] = await Promise.all([
    getHomepageHero(),
    getHomepageBrowse(),
  ])

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
          description="Manage homepage sections, content, and visibility. Hero and Browse by Category content are stored in the database."
          badge="Hero + Browse synced to database"
        />

        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <HomepageEditor
            initialHero={hero.content}
            initialHeroVisible={hero.isVisible}
            initialBrowse={browse.content}
            initialBrowseVisible={browse.isVisible}
          />
        </main>
      </div>
    </div>
  )
}
