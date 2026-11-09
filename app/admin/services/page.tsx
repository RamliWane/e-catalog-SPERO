import type { Metadata } from "next"
import { Layers3 } from "lucide-react"
import AdminPlaceholderPage from "@/app/components/admin/AdminPlaceholderPage"

export const metadata: Metadata = {
  title: "Services Management | Spero Admin",
  description: "Manage the services displayed on the Spero website.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminServicesPage() {
  return (
    <AdminPlaceholderPage
      section="Services"
      title="Services Management"
      description="Manage the services displayed on your website."
      icon={Layers3}
    />
  )
}
