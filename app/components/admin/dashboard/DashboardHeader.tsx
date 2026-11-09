export default function DashboardHeader() {
  return (
    <header className="border-b border-[#DDE7F8] bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="text-[24px] font-bold tracking-tight text-[#14213D] sm:text-[28px]">
            Dashboard
          </h1>
          <p className="mt-1 text-[13px] text-[#526786]">
            Manage your website content in one place.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#14213D] text-[13px] font-semibold text-white">
            A
          </span>
          <span className="text-[12px] font-semibold text-[#14213D]">
            Administrator
          </span>
        </div>
      </div>
    </header>
  )
}
