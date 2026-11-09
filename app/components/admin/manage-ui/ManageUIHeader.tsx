import Link from "next/link"
import { Monitor } from "lucide-react"
import type { ReactNode } from "react"

export type ManageUIBreadcrumbItem = {
  label: string
  href?: string
}

type ManageUIHeaderProps = {
  breadcrumb: ManageUIBreadcrumbItem[]
  title: string
  description: string
  badge?: string
  actions?: ReactNode
}

export default function ManageUIHeader({
  breadcrumb,
  title,
  description,
  badge,
  actions,
}: ManageUIHeaderProps) {
  return (
    <header className="border-b border-[#DDE7F8] bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#526786]">
            {breadcrumb.map((item, index) => (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-[#183B56]">
                    {item.label}
                  </span>
                )}
                {index < breadcrumb.length - 1 ? (
                  <span aria-hidden="true" className="text-[#A3B3CA]">
                    /
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-[24px] font-bold tracking-tight text-[#14213D] sm:text-[28px]">
              {title}
            </h1>
            <p className="mt-1 max-w-2xl text-[13px] text-[#526786]">
              {description}
            </p>
            {badge ? (
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#DDE7F8] bg-[#F5F8FF] px-2.5 py-1 text-[10px] font-semibold text-[#183B56]">
                <Monitor size={11} aria-hidden="true" />
                {badge}
              </span>
            ) : null}
          </div>

          {actions ? (
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
