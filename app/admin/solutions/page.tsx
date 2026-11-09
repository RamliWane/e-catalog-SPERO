import type { Metadata } from "next"
import { Lightbulb } from "lucide-react"
import AdminPlaceholderPage from "@/app/components/admin/AdminPlaceholderPage"

export const metadata: Metadata = {
  title: "Solutions Management | Spero Admin",
  description: "Manage the solutions offered on the Spero website.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminSolutionsPage() {
  return (
    <AdminPlaceholderPage
      section="Solutions"
      title="Solutions Management"
      description="Manage the solutions offered on your website."
      icon={Lightbulb}
    />
  )
}
