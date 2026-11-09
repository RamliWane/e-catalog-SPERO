"use client"

import { CalendarDays, Clock3, Mail } from "lucide-react"
import UserAvatar from "./UserAvatar"
import UserModal from "./UserModal"
import { RoleBadge, StatusBadge } from "./UserBadges"
import type { UserRecord } from "./user-data"

export default function UserDetailsModal({
  user,
  onClose,
}: {
  user: UserRecord
  onClose: () => void
}) {
  return (
    <UserModal
      title="User Details"
      description="Review the account information stored for this user."
      onClose={onClose}
    >
      <div className="flex items-center gap-4">
        <UserAvatar name={user.name} size="lg" />
        <div className="min-w-0">
          <p className="truncate text-[17px] font-semibold text-[#14213D]">
            {user.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-[12px] text-[#526786]">
            <Mail size={13} aria-hidden="true" className="shrink-0" />
            <span className="truncate">{user.email}</span>
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <RoleBadge role={user.role} />
            <StatusBadge status={user.status} />
          </div>
        </div>
      </div>

      <dl className="mt-5 grid gap-4 border-t border-[#DDE7F8] pt-5 sm:grid-cols-2">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A8CA8]">
            Role
          </dt>
          <dd className="mt-1.5 text-[13px] font-medium text-[#183B56]">
            {user.role}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A8CA8]">
            Account Status
          </dt>
          <dd className="mt-1.5 text-[13px] font-medium text-[#183B56]">
            {user.status}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A8CA8]">
            <CalendarDays size={12} aria-hidden="true" />
            Date Joined
          </dt>
          <dd className="mt-1.5 text-[13px] text-[#526786]">
            {user.joinedAt}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A8CA8]">
            <Clock3 size={12} aria-hidden="true" />
            Last Activity
          </dt>
          <dd className="mt-1.5 text-[13px] text-[#526786]">
            {user.lastActivity}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex justify-end border-t border-[#DDE7F8] pt-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-[#DDE7F8] bg-white px-4 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
        >
          Close
        </button>
      </div>
    </UserModal>
  )
}
