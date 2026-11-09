import type { Metadata } from "next"
import { Info } from "lucide-react"
import AdminPlaceholderPage from "@/app/components/admin/AdminPlaceholderPage"

export const metadata: Metadata = {
  title: "About Management | Spero Admin",
  description: "Manage the About content for the Spero website.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminAboutPage() {
  return (
    <AdminPlaceholderPage
      section="About"
      title="About Management"
      description="Manage the About content for your website."
      icon={Info}
    />
  )
}
