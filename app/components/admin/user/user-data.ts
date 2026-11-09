export const USER_ROLES = ["Admin", "User"] as const
export const USER_STATUSES = ["Active", "Inactive"] as const
export const USER_ROLE_FILTERS = ["All Roles", ...USER_ROLES] as const
export const USER_STATUS_FILTERS = ["All Status", ...USER_STATUSES] as const

export type UserRole = (typeof USER_ROLES)[number]
export type UserStatus = (typeof USER_STATUSES)[number]
export type UserRoleFilter = (typeof USER_ROLE_FILTERS)[number]
export type UserStatusFilter = (typeof USER_STATUS_FILTERS)[number]

export type UserRecord = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinedAt: string
  lastActivity: string
}

export type UserFormValues = Pick<
  UserRecord,
  "name" | "email" | "role" | "status"
>

export const USER_SUMMARY = {
  total: 128,
  active: 112,
  inactive: 16,
} as const

export const INITIAL_USERS: UserRecord[] = [
  {
    id: "andi-pratama",
    name: "Andi Pratama",
    email: "andi.pratama@spero.test",
    role: "Admin",
    status: "Active",
    joinedAt: "Nov 02, 2026",
    lastActivity: "2 minutes ago",
  },
  {
    id: "sarah-putri",
    name: "Sarah Putri",
    email: "sarah.putri@spero.test",
    role: "User",
    status: "Active",
    joinedAt: "Oct 28, 2026",
    lastActivity: "1 hour ago",
  },
  {
    id: "budi-santoso",
    name: "Budi Santoso",
    email: "budi.santoso@spero.test",
    role: "User",
    status: "Inactive",
    joinedAt: "Oct 21, 2026",
    lastActivity: "3 days ago",
  },
  {
    id: "nadia-permata",
    name: "Nadia Permata",
    email: "nadia.permata@spero.test",
    role: "Admin",
    status: "Active",
    joinedAt: "Sep 14, 2026",
    lastActivity: "Yesterday",
  },
  {
    id: "rizky-ramadhan",
    name: "Rizky Ramadhan",
    email: "rizky.ramadhan@spero.test",
    role: "User",
    status: "Active",
    joinedAt: "Sep 03, 2026",
    lastActivity: "4 hours ago",
  },
  {
    id: "dinda-maharani",
    name: "Dinda Maharani",
    email: "dinda.maharani@spero.test",
    role: "User",
    status: "Active",
    joinedAt: "Aug 27, 2026",
    lastActivity: "2 days ago",
  },
  {
    id: "fajar-nugraha",
    name: "Fajar Nugraha",
    email: "fajar.nugraha@spero.test",
    role: "Admin",
    status: "Inactive",
    joinedAt: "Aug 18, 2026",
    lastActivity: "1 week ago",
  },
  {
    id: "maya-lestari",
    name: "Maya Lestari",
    email: "maya.lestari@spero.test",
    role: "User",
    status: "Active",
    joinedAt: "Aug 05, 2026",
    lastActivity: "30 minutes ago",
  },
  {
    id: "kevin-wijaya",
    name: "Kevin Wijaya",
    email: "kevin.wijaya@spero.test",
    role: "User",
    status: "Active",
    joinedAt: "Jul 22, 2026",
    lastActivity: "5 hours ago",
  },
  {
    id: "sinta-amelia",
    name: "Sinta Amelia",
    email: "sinta.amelia@spero.test",
    role: "User",
    status: "Inactive",
    joinedAt: "Jul 11, 2026",
    lastActivity: "2 weeks ago",
  },
]

const AVATAR_TONE_CLASSES = [
  "bg-[#EFF6FF] text-[#183B56]",
  "bg-[#F5F8FF] text-[#3978FF]",
  "bg-[#F1F5F9] text-[#475569]",
  "bg-[#E8F1FF] text-[#265DBF]",
  "bg-[#EEF4F8] text-[#35526B]",
]

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return "?"
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

export function getAvatarTone(name: string) {
  const score = name
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0)

  return AVATAR_TONE_CLASSES[score % AVATAR_TONE_CLASSES.length]
}

export function formatJoinedDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date)
}
