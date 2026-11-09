"use client"

import { TriangleAlert } from "lucide-react"
import UserModal from "./UserModal"
import type { UserRecord } from "./user-data"

export default function DeleteUserModal({
  user,
  onClose,
  onConfirm,
}: {
  user: UserRecord
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <UserModal
      title="Delete User"
      description="This action removes the account from the current user list."
      onClose={onClose}
    >
      <div className="flex items-start gap-3 rounded-lg border border-[#FECDCA] bg-[#FEF3F2] p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#B42318]">
          <TriangleAlert size={17} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#7A271A]">
            Are you sure you want to delete this user?
          </p>
          <p className="mt-1 text-[12px] leading-5 text-[#B42318]">
            <span className="font-medium">{user.name}</span> ({user.email})
            will be removed from this local demo list. This change is not saved
            permanently.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#DDE7F8] pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-[#DDE7F8] bg-white px-4 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-[#B42318] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#912018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318] focus-visible:ring-offset-2"
        >
          Delete User
        </button>
      </div>
    </UserModal>
  )
}
