import type { Metadata } from "next"
import AdminLoginForm from "@/app/components/admin/login/AdminLoginForm"

export const metadata: Metadata = {
  title: "Admin Login | Spero",
  description: "Secure administrator access for the Spero website.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F8FF] px-4 py-10 font-sans sm:px-6">
      <div className="w-full max-w-[420px]">
        <AdminLoginForm />
      </div>
    </main>
  )
}
