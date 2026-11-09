import { ShieldCheck } from "lucide-react"
import type { UserRole, UserStatus } from "./user-data"

export function RoleBadge({ role }: { role: UserRole }) {
  const isAdmin = role === "Admin"

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isAdmin
          ? "bg-[#EFF6FF] text-[#183B56]"
          : "bg-[#F1F5F9] text-[#526786]"
      }`}
    >
      {isAdmin ? (
        <ShieldCheck size={11} aria-hidden="true" />
      ) : (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[#94A3B8]"
        />
      )}
      {role}
    </span>
  )
}

export function StatusBadge({ status }: { status: UserStatus }) {
  const isActive = status === "Active"

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isActive
          ? "bg-[#EFF6FF] text-[#183B56]"
          : "bg-[#F1F5F9] text-[#526786]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-[#3978FF]" : "bg-[#94A3B8]"
        }`}
      />
      {status}
    </span>
  )
}
