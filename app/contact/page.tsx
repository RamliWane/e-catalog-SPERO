import type { Metadata } from "next"
import Sidebar from "@/app/components/layout/Sidebar"
import TopNavbar from "@/app/components/layout/TopNavbar"
import ContactPageContent from "@/app/components/contact/ContactPageContent"

export const metadata: Metadata = {
  title: "Contact Us | Spero",
  description:
    "Get in touch with Spero and visit our office in Jakarta for software and IT consulting partnerships.",
}

export default function ContactPage() {
  return (
    <div className="flex h-screen bg-white font-sans">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:ml-[230px]">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-8 sm:px-[30px] lg:py-10">
          <ContactPageContent />
        </main>
      </div>
    </div>
  )
}
