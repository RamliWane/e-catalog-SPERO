import {
  LayoutGridIcon,
  CloudIcon,
  ShapesIcon,
} from "@/lib/icons"

type HelpItem = {
  title: string
  description: string
  Icon: React.ComponentType<{ className?: string; size?: number }>
}

const HELP_ITEMS: HelpItem[] = [
  {
    title: "Build a digital product",
    description:
      "From concept to launch, we help you build innovative digital products.",
    Icon: LayoutGridIcon,
  },
  {
    title: "Improve an existing system",
    description:
      "Optimize and scale your current systems for better performance.",
    Icon: ShapesIcon,
  },
  {
    title: "Modernize your infrastructure",
    description:
      "Upgrade your infrastructure for greater flexibility and reliability.",
    Icon: CloudIcon,
  },
]

export default function HowWeCanHelp() {
  return (
    <section className="bg-white py-15 px-[30px]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-6 mb-[25px]">
          <span className="inline-block text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            HOW WE CAN HELP
          </span>
          <h2 className="text-[40px] font-bold leading-tight text-[#14213D] tracking-tight">
            Turn your ideas into real solutions.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px]">
          {HELP_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 border-l border-[#E2EAF5] pl-[30px] pt-[8px] pb-[8px]"
            >
              <item.Icon size={20} className="text-[#2463FF] shrink-0" />
              <div className="flex flex-col gap-2">
                <h3 className="text-[17px] font-semibold text-[#14213D] leading-tight">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#526786] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
