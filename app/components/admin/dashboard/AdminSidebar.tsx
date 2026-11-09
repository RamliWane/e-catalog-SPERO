"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Boxes,
  ChevronDown,
  Layers3,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelsTopLeft,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Catalog", href: "/admin/catalog", icon: Boxes },
]

const SECONDARY_NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/admin/services", icon: Layers3 },
  { label: "Users", href: "/admin/user", icon: Users },
]

const MANAGE_UI_ITEMS = [
  { label: "Homepage", href: "/admin/manage-ui/homepage" },
  { label: "Services", href: "/admin/manage-ui/services" },
  { label: "Catalog", href: "/admin/manage-ui/catalog" },
  { label: "Contact Us", href: "/admin/manage-ui/contact" },
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

function ManageUIMenu({
  pathname,
  isOpen,
  submenuId,
  onToggle,
  onNavigate,
}: {
  pathname: string
  isOpen: boolean
  submenuId: string
  onToggle: () => void
  onNavigate?: () => void
}) {
  const isParentActive = pathname.startsWith("/admin/manage-ui")

  return (
    <li>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={submenuId}
        onClick={onToggle}
        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 ${
          isOpen
            ? "bg-[#F8FAFC] text-[#14213D]"
            : isParentActive
              ? "text-[#14213D] hover:bg-[#F8FAFC]"
              : "text-[#526786] hover:bg-[#F8FAFC] hover:text-[#14213D]"
        }`}
      >
        <PanelsTopLeft
          size={17}
          strokeWidth={1.9}
          aria-hidden="true"
          className={
            isParentActive
              ? "shrink-0 text-[#3978FF]"
              : "shrink-0 text-[#7A8CA8] group-hover:text-[#183B56]"
          }
        />
        <span className="flex-1">Manage UI</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${
            isOpen
              ? "rotate-180 text-[#3978FF]"
              : "text-[#7A8CA8] group-hover:text-[#183B56]"
          }`}
        />
      </button>

      {isOpen ? (
        <div
          id={submenuId}
          className="ml-[26px] mt-1 space-y-0.5 border-l border-[#DDE7F8] pl-2.5"
        >
          {MANAGE_UI_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 ${
                  active
                    ? "bg-[#EFF6FF] text-[#183B56]"
                    : "text-[#526786] hover:bg-[#F8FAFC] hover:text-[#14213D]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    active ? "bg-[#3978FF]" : "bg-[#CBD5E1]"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      ) : null}
    </li>
  )
}

function SidebarNavigation({
  pathname,
  manageUIOpen,
  submenuId,
  onToggleManageUI,
  onNavigate,
}: {
  pathname: string
  manageUIOpen: boolean
  submenuId: string
  onToggleManageUI: () => void
  onNavigate?: () => void
}) {
  return (
    <ul className="space-y-1">
      {PRIMARY_NAV_ITEMS.map((item) => (
        <li key={item.label}>
          <NavItemLink
            item={item}
            active={isItemActive(pathname, item.href)}
            onClick={onNavigate}
          />
        </li>
      ))}

      <ManageUIMenu
        pathname={pathname}
        isOpen={manageUIOpen}
        submenuId={submenuId}
        onToggle={onToggleManageUI}
        onNavigate={onNavigate}
      />

      {SECONDARY_NAV_ITEMS.map((item) => (
        <li key={item.label}>
          <NavItemLink
            item={item}
            active={isItemActive(pathname, item.href)}
            onClick={onNavigate}
          />
        </li>
      ))}
    </ul>
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
  const isManageUIActive = pathname.startsWith("/admin/manage-ui")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [manageUIOverride, setManageUIOverride] = useState<{
    pathname: string
    open: boolean
  } | null>(null)
  const manageUIOpen =
    manageUIOverride?.pathname === pathname
      ? manageUIOverride.open
      : isManageUIActive

  function toggleManageUI() {
    setManageUIOverride({
      pathname,
      open: !manageUIOpen,
    })
  }

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
          <SidebarNavigation
            pathname={pathname}
            manageUIOpen={manageUIOpen}
            submenuId="admin-manage-ui-desktop"
            onToggleManageUI={toggleManageUI}
          />
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
              <SidebarNavigation
                pathname={pathname}
                manageUIOpen={manageUIOpen}
                submenuId="admin-manage-ui-mobile"
                onToggleManageUI={toggleManageUI}
                onNavigate={() => setMobileOpen(false)}
              />
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
