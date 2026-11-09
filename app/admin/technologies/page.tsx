import type { Metadata } from "next"
import { Cpu } from "lucide-react"
import AdminPlaceholderPage from "@/app/components/admin/AdminPlaceholderPage"

export const metadata: Metadata = {
  title: "Technologies Management | Spero Admin",
  description: "Manage the technologies listed on the Spero website.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminTechnologiesPage() {
  return (
    <AdminPlaceholderPage
      section="Technologies"
      title="Technologies Management"
      description="Manage the technologies listed across your website."
      icon={Cpu}
    />
  )
}
