import { Pencil } from "lucide-react"

type ContentStatus = "Published" | "Draft"

type RecentContentItem = {
  name: string
  type: string
  updated: string
  status: ContentStatus
}

const RECENT_CONTENT: RecentContentItem[] = [
  {
    name: "Spero Dashboard",
    type: "Catalog",
    updated: "2 hours ago",
    status: "Published",
  },
  {
    name: "Web Development",
    type: "Service",
    updated: "Yesterday",
    status: "Published",
  },
  {
    name: "Cloud Infrastructure",
    type: "Technology",
    updated: "2 days ago",
    status: "Draft",
  },
  {
    name: "Business Management Platform",
    type: "Solution",
    updated: "3 days ago",
    status: "Published",
  },
]

function StatusBadge({ status }: { status: ContentStatus }) {
  const isPublished = status === "Published"

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isPublished
          ? "bg-[#EFF6FF] text-[#183B56]"
          : "bg-[#F1F5F9] text-[#526786]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          isPublished ? "bg-[#3978FF]" : "bg-[#94A3B8]"
        }`}
      />
      {status}
    </span>
  )
}

function EditButton({ name }: { name: string }) {
  return (
    <button
      type="button"
      aria-label={`Edit ${name}`}
      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#DDE7F8] bg-white px-2.5 text-[11px] font-medium text-[#526786] transition-colors hover:border-[#3978FF]/40 hover:text-[#14213D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3978FF] focus-visible:ring-offset-2"
    >
      <Pencil size={12} aria-hidden="true" />
      Edit
    </button>
  )
}

export default function RecentContent() {
  return (
    <section
      aria-labelledby="recent-content-heading"
      className="overflow-hidden rounded-xl border border-[#DDE7F8] bg-white shadow-[0_2px_8px_rgba(20,33,61,0.04)]"
    >
      <div className="border-b border-[#DDE7F8] px-4 py-4 sm:px-6">
        <h2
          id="recent-content-heading"
          className="text-[16px] font-semibold tracking-tight text-[#14213D]"
        >
          Recent Content
        </h2>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#DDE7F8] bg-[#F8FAFC]">
              <th
                scope="col"
                className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] sm:px-6"
              >
                Content Name
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786]"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786]"
              >
                Last Updated
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786]"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] sm:px-6"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#DDE7F8]">
            {RECENT_CONTENT.map((item) => (
              <tr
                key={item.name}
                className="transition-colors hover:bg-[#F8FAFC]"
              >
                <td className="px-5 py-4 text-[13px] font-semibold text-[#14213D] sm:px-6">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-[12px] text-[#526786]">
                  {item.type}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-[12px] text-[#526786]">
                  {item.updated}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right sm:px-6">
                  <EditButton name={item.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-[#DDE7F8] md:hidden">
        {RECENT_CONTENT.map((item) => (
          <li key={item.name} className="px-4 py-4 sm:px-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[#14213D]">
                  {item.name}
                </p>
                <p className="mt-0.5 text-[11px] text-[#526786]">
                  {item.type}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[11px] text-[#526786]">
                Updated {item.updated}
              </p>
              <EditButton name={item.name} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
