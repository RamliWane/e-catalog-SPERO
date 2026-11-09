"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

export default function UserManagementHeader({
  onAddUser,
}: {
  onAddUser: () => void
}) {
  return (
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
                Users
              </span>
            </li>
          </ol>
        </nav>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-[24px] font-bold tracking-tight text-[#14213D] sm:text-[28px]">
              User Management
            </h1>
            <p className="mt-1 text-[13px] text-[#526786]">
              Manage user accounts and monitor their account status.
            </p>
          </div>

          <button
            type="button"
            onClick={onAddUser}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#14213D] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#183B56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 sm:self-auto"
          >
            <Plus size={16} aria-hidden="true" />
            Add User
          </button>
        </div>
      </div>
    </header>
  )
}
