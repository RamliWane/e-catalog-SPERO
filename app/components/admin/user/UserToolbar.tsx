"use client"

import { ChevronDown, RotateCcw, Search } from "lucide-react"
import {
  USER_ROLE_FILTERS,
  USER_STATUS_FILTERS,
  type UserRoleFilter,
  type UserStatusFilter,
} from "./user-data"

type UserToolbarProps = {
  search: string
  role: UserRoleFilter
  status: UserStatusFilter
  hasActiveFilters: boolean
  onSearchChange: (value: string) => void
  onRoleChange: (value: UserRoleFilter) => void
  onStatusChange: (value: UserStatusFilter) => void
  onReset: () => void
}

const fieldClassName =
  "h-10 w-full rounded-lg border border-[#DDE7F8] bg-white text-[12px] text-[#14213D] transition-colors focus:border-[#3978FF] focus:outline-none focus:ring-2 focus:ring-[#3978FF]/20"

export default function UserToolbar({
  search,
  role,
  status,
  hasActiveFilters,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onReset,
}: UserToolbarProps) {
  return (
    <section
      aria-label="User search and filters"
      className="rounded-xl border border-[#DDE7F8] bg-white p-4 shadow-[0_2px_8px_rgba(20,33,61,0.04)]"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_160px_160px_auto]">
        <div className="relative sm:col-span-2 xl:col-span-1">
          <label htmlFor="user-search" className="sr-only">
            Search users by name or email
          </label>
          <Search
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
          />
          <input
            id="user-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or email..."
            autoComplete="off"
            className={`${fieldClassName} pl-9 pr-3 placeholder:text-[#8A9AB5]`}
          />
        </div>

        <div className="relative">
          <label htmlFor="user-role" className="sr-only">
            Filter by role
          </label>
          <select
            id="user-role"
            value={role}
            onChange={(event) =>
              onRoleChange(event.target.value as UserRoleFilter)
            }
            className={`${fieldClassName} appearance-none px-3 pr-9`}
          >
            {USER_ROLE_FILTERS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
          />
        </div>

        <div className="relative">
          <label htmlFor="user-status" className="sr-only">
            Filter by status
          </label>
          <select
            id="user-status"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as UserStatusFilter)
            }
            className={`${fieldClassName} appearance-none px-3 pr-9`}
          >
            {USER_STATUS_FILTERS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8CA8]"
          />
        </div>

        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DDE7F8] bg-white px-3 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 xl:col-span-1"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Reset Filter
        </button>
      </div>
    </section>
  )
}
