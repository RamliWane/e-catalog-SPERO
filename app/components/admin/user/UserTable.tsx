"use client"

import { Eye, Pencil, Trash2, type LucideIcon } from "lucide-react"
import UserAvatar from "./UserAvatar"
import { RoleBadge, StatusBadge } from "./UserBadges"
import type { UserRecord } from "./user-data"

type UserTableProps = {
  users: UserRecord[]
  onView: (user: UserRecord) => void
  onEdit: (user: UserRecord) => void
  onDelete: (user: UserRecord) => void
}

function ActionButton({
  label,
  icon: Icon,
  userName,
  onClick,
  danger = false,
}: {
  label: string
  icon: LucideIcon
  userName: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={`${label} ${userName}`}
      title={label}
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[#7A8CA8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 ${
        danger
          ? "hover:border-[#FECDCA] hover:bg-[#FEF3F2] hover:text-[#B42318]"
          : "hover:border-[#DDE7F8] hover:bg-[#F8FAFC] hover:text-[#183B56]"
      }`}
    >
      <Icon size={14} strokeWidth={1.9} aria-hidden="true" />
    </button>
  )
}

function UserActions({
  user,
  onView,
  onEdit,
  onDelete,
}: {
  user: UserRecord
  onView: (user: UserRecord) => void
  onEdit: (user: UserRecord) => void
  onDelete: (user: UserRecord) => void
}) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      <ActionButton
        label="View Details"
        icon={Eye}
        userName={user.name}
        onClick={() => onView(user)}
      />
      <ActionButton
        label="Edit User"
        icon={Pencil}
        userName={user.name}
        onClick={() => onEdit(user)}
      />
      <ActionButton
        label="Delete User"
        icon={Trash2}
        userName={user.name}
        onClick={() => onDelete(user)}
        danger
      />
    </div>
  )
}

export default function UserTable({
  users,
  onView,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <>
      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full min-w-[840px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#DDE7F8] bg-[#F8FAFC]">
              <th
                scope="col"
                className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-5"
              >
                User
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-4"
              >
                Role
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-4"
              >
                Status
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-4"
              >
                Date Joined
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-4"
              >
                Last Activity
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-5"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#DDE7F8]">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-[#F8FAFC]"
              >
                <td className="px-4 py-4 xl:px-5">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.name} />
                    <div className="min-w-0 max-w-[210px]">
                      <p
                        title={user.name}
                        className="truncate text-[13px] font-semibold text-[#14213D]"
                      >
                        {user.name}
                      </p>
                      <p
                        title={user.email}
                        className="mt-0.5 truncate text-[11px] text-[#526786]"
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 xl:px-4">
                  <RoleBadge role={user.role} />
                </td>
                <td className="whitespace-nowrap px-3 py-4 xl:px-4">
                  <StatusBadge status={user.status} />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[12px] text-[#526786] xl:px-4">
                  {user.joinedAt}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[12px] text-[#526786] xl:px-4">
                  {user.lastActivity}
                </td>
                <td className="whitespace-nowrap px-4 py-4 xl:px-5">
                  <UserActions
                    user={user}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-[#DDE7F8] xl:hidden">
        {users.map((user) => (
          <li key={user.id} className="px-4 py-4 sm:px-5">
            <div className="flex items-start gap-3">
              <UserAvatar name={user.name} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[#14213D]">
                  {user.name}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-[#526786]">
                  {user.email}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <RoleBadge role={user.role} />
                  <StatusBadge status={user.status} />
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-3 border-t border-[#DDE7F8] pt-3 sm:flex-row sm:items-center sm:justify-between">
              <dl className="grid grid-cols-1 gap-1.5 text-[11px] text-[#526786] sm:grid-cols-2 sm:gap-x-5">
                <div className="flex gap-1.5">
                  <dt className="font-medium text-[#7A8CA8]">Joined:</dt>
                  <dd>{user.joinedAt}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="font-medium text-[#7A8CA8]">Last activity:</dt>
                  <dd>{user.lastActivity}</dd>
                </div>
              </dl>

              <UserActions
                user={user}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
