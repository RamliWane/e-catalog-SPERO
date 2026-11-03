"use client"

import { ArrowRightIcon } from "@/lib/icons"

export default function ServicesHero() {
  return (
    <section className="bg-white py-[60px] px-[30px] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-[80px] items-start">
        {/* Left column: content */}
        <div className="flex flex-col gap-6 max-w-[520px] min-w-0">
          <span className="inline-block mb-[12px] text-[11px] font-medium text-blue-600 uppercase tracking-[0.2em]">
            WHAT WE DO / SERVICES
          </span>
          <h1 className="text-[44px] lg:text-[48px] font-bold leading-tight text-[#14213D] mt-[4px] tracking-tight max-w-[500px]">
            Digital services,<br />
            built around your business.
          </h1>
          <p className="text-[15px] text-[#526786] leading-relaxed max-w-[520px] mt-[16px]">
            From strategy and product design to engineering and infrastructure,
            explore the capabilities behind every Spero solution.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#14213D] bg-white px-5 py-2.5 text-[13px] font-medium text-[#14213D] transition-all duration-200 hover:bg-[#14213D] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
          >
            Discuss a project
            <ArrowRightIcon size={14} className="transition-transform duration-200 hover:translate-x-0.5" />
          </a>
        </div>

        {/* Right column: illustration */}
        <div className="relative min-w-0 flex items-center justify-center lg:pr-[40px]">
          <div className="relative w-full max-w-[420px] h-[360px] rounded-xl overflow-hidden bg-[#F5F7FA]">
            <img
              src="/asset-section-3.png"
              alt="Technology illustration"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
