
import { ArrowRightIcon } from "@/lib/icons"

export default function ServicesHero() {
  return (
    <section className="bg-white px-2 py-2">
      <div className="mx-auto grid max-w-6xl items-center gap-4 md:grid-cols-2">
        <div className="flex min-w-0 flex-col items-start">
          <span className="inline-block text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            Our Services
          </span>

          <h1 className="mt-3 max-w-[540px] text-3xl font-bold leading-[1.12] tracking-tight text-[#14213D] sm:text-4xl lg:text-[42px]">
            End-to-End Digital Solutions for Your Business
          </h1>

          <p className="mt-3 max-w-[440px] text-sm leading-6 text-[#526786] sm:text-[15px] sm:leading-[25px]">
            From innovative software to scalable infrastructure, our services
            are designed to help you build, grow, and innovate in the digital era.
          </p>

          <a
            href="#services-list"
            className="group mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#14213D] px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#244675] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Explore Our Services
            <ArrowRightIcon
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>

        <div className="flex h-[280px] min-w-0 items-center justify-center sm:h-[320px] lg:h-[360px]">
          <img
            src="/services-asset-1.png"
            alt="Digital services and technology illustration"
            className="block h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}
