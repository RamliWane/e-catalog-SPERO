import Link from "next/link"
import { ArrowLeft, type LucideIcon } from "lucide-react"
import AdminSidebar from "./dashboard/AdminSidebar"

type AdminPlaceholderPageProps = {
  section: string
  title: string
  description: string
  icon: LucideIcon
}

export default function AdminPlaceholderPage({
  section,
  title,
  description,
  icon: Icon,
}: AdminPlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <AdminSidebar />

      <div className="min-w-0 lg:pl-[240px]">
        <header className="border-b border-[#DDE7F8] bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-[11px] font-medium text-[#526786]">
                <li>
                  <Link
                    href="/admin/dashboard"
                    className="transition-colors hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
                  >
                    Dashboard
                  </Link>
                </li>
                <li aria-hidden="true" className="text-[#A3B3CA]">
                  /
                </li>
                <li>
                  <span aria-current="page" className="text-[#183B56]">
                    {section}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="mt-3">
              <h1 className="text-[24px] font-bold tracking-tight text-[#14213D] sm:text-[28px]">
                {title}
              </h1>
              <p className="mt-1 text-[13px] text-[#526786]">{description}</p>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section className="rounded-xl border border-[#DDE7F8] bg-white p-6 shadow-[0_2px_8px_rgba(20,33,61,0.04)] sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F5F8FF] text-[#3978FF]">
                <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
              </span>

              <div>
                <span className="inline-flex rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-semibold text-[#183B56]">
                  Coming Soon
                </span>
                <h2 className="mt-2 text-[18px] font-semibold tracking-tight text-[#14213D]">
                  {section} management is coming soon
                </h2>
                <p className="mt-1 max-w-xl text-[12px] leading-5 text-[#526786]">
                  This section is ready for the next UI implementation. Use the
                  sidebar to continue exploring the admin area.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/admin/dashboard"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#DDE7F8] bg-white px-3 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to Dashboard
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
