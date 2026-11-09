"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Users,
} from "lucide-react"
import DeleteUserModal from "./DeleteUserModal"
import UserDetailsModal from "./UserDetailsModal"
import UserFormModal from "./UserFormModal"
import UserManagementHeader from "./UserManagementHeader"
import UserStats from "./UserStats"
import UserTable from "./UserTable"
import UserToolbar from "./UserToolbar"
import {
  INITIAL_USERS,
  formatJoinedDate,
  type UserFormValues,
  type UserRecord,
  type UserRoleFilter,
  type UserStatusFilter,
} from "./user-data"

const PAGE_SIZE = 8

type UserModalState =
  | { type: "add" }
  | { type: "edit"; user: UserRecord }
  | { type: "view"; user: UserRecord }
  | { type: "delete"; user: UserRecord }
  | null

type FeedbackState = {
  message: string
}

type UserPaginationProps = {
  page: number
  totalPages: number
  totalItems: number
  startItem: number
  endItem: number
  onPageChange: (page: number) => void
}

function UserPagination({
  page,
  totalPages,
  totalItems,
  startItem,
  endItem,
  onPageChange,
}: UserPaginationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-[#DDE7F8] px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
      <p className="text-[11px] text-[#526786]">
        Showing{" "}
        <span className="font-medium text-[#183B56]">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="font-medium text-[#183B56]">{totalItems}</span>{" "}
        users
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#DDE7F8] bg-white px-2.5 text-[11px] font-medium text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={14} aria-hidden="true" />
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === page ? "page" : undefined}
              onClick={() => onPageChange(pageNumber)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 ${
                pageNumber === page
                  ? "bg-[#14213D] text-white"
                  : "border border-[#DDE7F8] bg-white text-[#526786] hover:bg-[#F8FAFC] hover:text-[#14213D]"
              }`}
            >
              {pageNumber}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#DDE7F8] bg-white px-2.5 text-[11px] font-medium text-[#526786] transition-colors hover:bg-[#F8FAFC] hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default function UserManagementContent() {
  const [users, setUsers] = useState<UserRecord[]>(() => INITIAL_USERS)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState<UserRoleFilter>("All Roles")
  const [status, setStatus] = useState<UserStatusFilter>("All Status")
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<UserModalState>(null)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)

  useEffect(() => {
    if (!feedback) {
      return
    }

    const timeout = window.setTimeout(() => setFeedback(null), 4000)
    return () => window.clearTimeout(timeout)
  }, [feedback])

  const hasActiveFilters =
    search.trim() !== "" || role !== "All Roles" || status !== "All Status"

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesRole = role === "All Roles" || user.role === role
      const matchesStatus = status === "All Status" || user.status === status
      const matchesSearch =
        query === "" ||
        [user.name, user.email].some((value) =>
          value.toLowerCase().includes(query),
        )

      return matchesRole && matchesStatus && matchesSearch
    })
  }, [role, search, status, users])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const visibleUsers = filteredUsers.slice(startIndex, startIndex + PAGE_SIZE)
  const startItem = filteredUsers.length === 0 ? 0 : startIndex + 1
  const endItem = Math.min(startIndex + PAGE_SIZE, filteredUsers.length)

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleRoleChange(value: UserRoleFilter) {
    setRole(value)
    setPage(1)
  }

  function handleStatusChange(value: UserStatusFilter) {
    setStatus(value)
    setPage(1)
  }

  function handleResetFilters() {
    setSearch("")
    setRole("All Roles")
    setStatus("All Status")
    setPage(1)
  }

  function closeModal() {
    setModal(null)
  }

  function handleAddUser(values: UserFormValues) {
    const newUser: UserRecord = {
      id: `user-${Date.now()}`,
      ...values,
      joinedAt: formatJoinedDate(),
      lastActivity: "Just now",
    }

    setUsers((current) => [newUser, ...current])
    setSearch("")
    setRole("All Roles")
    setStatus("All Status")
    setPage(1)
    setModal(null)
    setFeedback({ message: `${values.name} was added successfully.` })
  }

  function handleEditUser(values: UserFormValues) {
    if (modal?.type !== "edit") {
      return
    }

    const targetId = modal.user.id

    setUsers((current) =>
      current.map((user) =>
        user.id === targetId ? { ...user, ...values } : user,
      ),
    )
    setModal(null)
    setFeedback({ message: `${values.name} was updated successfully.` })
  }

  function handleDeleteUser() {
    if (modal?.type !== "delete") {
      return
    }

    const targetUser = modal.user

    setUsers((current) => current.filter((user) => user.id !== targetUser.id))
    setModal(null)
    setFeedback({ message: `${targetUser.name} was deleted.` })
  }

  const existingEmails =
    modal?.type === "edit"
      ? users
          .filter((user) => user.id !== modal.user.id)
          .map((user) => user.email)
      : users.map((user) => user.email)

  return (
    <>
      <UserManagementHeader onAddUser={() => setModal({ type: "add" })} />

      <main className="mx-auto w-full max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <UserStats />

        {feedback ? (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-2 rounded-xl border border-[#C7DBFF] bg-[#F5F8FF] px-4 py-3 text-[12px] leading-5 text-[#183B56] shadow-[0_2px_8px_rgba(20,33,61,0.04)]"
          >
            <CircleCheck
              size={16}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[#3978FF]"
            />
            <p>{feedback.message}</p>
          </div>
        ) : null}

        <div className="space-y-4">
          <UserToolbar
            search={search}
            role={role}
            status={status}
            hasActiveFilters={hasActiveFilters}
            onSearchChange={handleSearchChange}
            onRoleChange={handleRoleChange}
            onStatusChange={handleStatusChange}
            onReset={handleResetFilters}
          />

          <section
            aria-labelledby="user-table-heading"
            className="overflow-hidden rounded-xl border border-[#DDE7F8] bg-white shadow-[0_2px_8px_rgba(20,33,61,0.04)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#DDE7F8] px-4 py-4 sm:px-6">
              <h2
                id="user-table-heading"
                className="text-[16px] font-semibold tracking-tight text-[#14213D]"
              >
                User List
              </h2>
              <span className="text-[11px] font-medium text-[#526786]">
                {filteredUsers.length} users
              </span>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F5F8FF] text-[#3978FF]">
                  <Users size={20} aria-hidden="true" />
                </span>
                <p className="mt-3 text-[13px] font-semibold text-[#14213D]">
                  No users found
                </p>
                <p className="mt-1 text-[12px] text-[#526786]">
                  Try adjusting your search or filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 inline-flex h-9 items-center justify-center rounded-lg border border-[#DDE7F8] bg-white px-3 text-[12px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <UserTable
                users={visibleUsers}
                onView={(user) => setModal({ type: "view", user })}
                onEdit={(user) => setModal({ type: "edit", user })}
                onDelete={(user) => setModal({ type: "delete", user })}
              />
            )}

            <UserPagination
              page={currentPage}
              totalPages={totalPages}
              totalItems={filteredUsers.length}
              startItem={startItem}
              endItem={endItem}
              onPageChange={setPage}
            />
          </section>
        </div>
      </main>

      {modal?.type === "add" || modal?.type === "edit" ? (
        <UserFormModal
          mode={modal.type}
          user={modal.type === "edit" ? modal.user : undefined}
          existingEmails={existingEmails}
          onClose={closeModal}
          onSubmit={
            modal.type === "add" ? handleAddUser : handleEditUser
          }
        />
      ) : null}

      {modal?.type === "view" ? (
        <UserDetailsModal user={modal.user} onClose={closeModal} />
      ) : null}

      {modal?.type === "delete" ? (
        <DeleteUserModal
          user={modal.user}
          onClose={closeModal}
          onConfirm={handleDeleteUser}
        />
      ) : null}
    </>
  )
}
