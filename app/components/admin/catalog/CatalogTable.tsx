import Image from "next/image"
import { Pencil, Trash2, type LucideIcon } from "lucide-react"
import type { CatalogItem, CatalogStatus } from "./catalog-data"

function StatusBadge({ status }: { status: CatalogStatus }) {
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

function ActionButton({
  label,
  icon: Icon,
  itemName,
  danger = false,
}: {
  label: string
  icon: LucideIcon
  itemName: string
  danger?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={`${label} ${itemName}`}
      title={label}
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

function CatalogActions({ item }: { item: CatalogItem }) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      <ActionButton label="Edit" icon={Pencil} itemName={item.name} />
      <ActionButton label="Delete" icon={Trash2} itemName={item.name} danger />
    </div>
  )
}

export default function CatalogTable({ items }: { items: CatalogItem[] }) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#DDE7F8] bg-[#F8FAFC]">
              <th
                scope="col"
                className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-5"
              >
                Catalog
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-4"
              >
                Category
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-4"
              >
                Last Updated
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526786] xl:px-4"
              >
                Status
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
            {items.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-[#F8FAFC]"
              >
                <td className="px-4 py-4 xl:px-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.thumbnail}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-lg border border-[#DDE7F8] object-cover"
                    />
                    <div className="min-w-0 max-w-[170px] xl:max-w-[320px]">
                      <p
                        title={item.name}
                        className="truncate text-[13px] font-semibold text-[#14213D]"
                      >
                        {item.name}
                      </p>
                      <p
                        title={item.description}
                        className="mt-0.5 truncate text-[11px] text-[#526786]"
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[12px] text-[#526786] xl:px-4">
                  {item.category}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-[12px] text-[#526786] xl:px-4">
                  {item.updatedAt}
                </td>
                <td className="whitespace-nowrap px-3 py-4 xl:px-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-4 xl:px-5">
                  <CatalogActions item={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-[#DDE7F8] md:hidden">
        {items.map((item) => (
          <li key={item.id} className="px-4 py-4 sm:px-5">
            <div className="flex items-start gap-3">
              <Image
                src={item.thumbnail}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-lg border border-[#DDE7F8] object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-[#14213D]">
                  {item.name}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-[#526786]">
                  {item.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#F5F8FF] px-2.5 py-1 text-[10px] font-medium text-[#183B56]">
                    {item.category}
                  </span>
                  <StatusBadge status={item.status} />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[11px] text-[#526786]">
                Updated {item.updatedAt}
              </p>
              <CatalogActions item={item} />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
