"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Boxes,
  Cpu,
  Info,
  Layers3,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Catalog", href: "/admin/catalog", icon: Boxes },
  { label: "Services", href: "/admin/services", icon: Layers3 },
  { label: "Technologies", href: "/admin/technologies", icon: Cpu },
  { label: "Solutions", href: "/admin/solutions", icon: Lightbulb },
  { label: "About", href: "/admin/about", icon: Info },
]

function SperoLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#14213D] text-[15px] font-bold text-white">
        S
      </span>
      <span className="leading-tight">
        <span className="block text-[16px] font-bold tracking-tight text-[#14213D]">
          Spero
        </span>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#526786]">
          Admin
        </span>
      </span>
    </div>
  )
}

function NavItemLink({
  item,
  active,
  onClick,
}: {
  item: NavItem
  active: boolean
  onClick?: () => void
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 ${
        active
          ? "bg-[#F5F8FF] text-[#14213D]"
          : "text-[#526786] hover:bg-[#F8FAFC] hover:text-[#14213D]"
      }`}
    >
      <Icon
        size={17}
        strokeWidth={1.9}
        aria-hidden="true"
        className={
          active
            ? "shrink-0 text-[#3978FF]"
            : "shrink-0 text-[#7A8CA8] group-hover:text-[#183B56]"
        }
      />
      <span>{item.label}</span>
    </Link>
  )
}

function LogoutLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/admin/login"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
    >
      <LogOut
        size={17}
        strokeWidth={1.9}
        aria-hidden="true"
        className="shrink-0 text-[#7A8CA8]"
      />
      <span>Logout</span>
    </Link>
  )
}

function isItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col border-r border-[#DDE7F8] bg-white lg:flex">
        <div className="flex h-[72px] items-center border-b border-[#DDE7F8] px-5">
          <SperoLogo />
        </div>

        <nav
          aria-label="Admin navigation"
          className="flex-1 overflow-y-auto px-3 py-5"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <NavItemLink
                  item={item}
                  active={isItemActive(pathname, item.href)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[#DDE7F8] p-3">
          <LogoutLink />
        </div>
      </aside>

      <div className="sticky top-0 z-40 border-b border-[#DDE7F8] bg-white lg:hidden">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <SperoLogo />

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="admin-mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDE7F8] text-[#183B56] transition-colors hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
          >
            {mobileOpen ? (
              <X size={19} aria-hidden="true" />
            ) : (
              <Menu size={19} aria-hidden="true" />
            )}
          </button>
        </div>

        {mobileOpen ? (
          <div
            id="admin-mobile-navigation"
            className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#DDE7F8] bg-white px-3 pb-4 pt-2 shadow-[0_12px_24px_rgba(20,33,61,0.08)]"
          >
            <nav aria-label="Admin mobile navigation">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <NavItemLink
                      item={item}
                      active={isItemActive(pathname, item.href)}
                      onClick={() => setMobileOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-3 border-t border-[#DDE7F8] pt-3">
              <LogoutLink onClick={() => setMobileOpen(false)} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
