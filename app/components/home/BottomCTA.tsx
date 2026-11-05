
"use client";

import { ArrowRightIcon } from "@/lib/icons";

export default function BottomCTA() {
  return (
    <section className="bg-white px-5 py-10 sm:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="group relative isolate overflow-hidden rounded-2xl bg-[#142D56] px-6 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-12">

          {/* Background layers */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#19396B] via-[#142D56] to-[#101D3A]" />

            {/* Left 3D spheres */}
            <div className="absolute -left-16 -top-12 aspect-square w-48 rounded-full bg-gradient-to-br from-[#70A7FF] via-[#2878F0] to-[#153B86] shadow-[inset_-16px_-18px_30px_rgba(8,30,80,0.45)] sm:-left-14 sm:-top-16 sm:w-60" />

            <div className="absolute -bottom-24 -left-7 aspect-square w-40 rounded-full bg-gradient-to-br from-[#438BFF] via-[#2457B8] to-[#10254C] shadow-[inset_-12px_-12px_28px_rgba(8,20,55,0.5)] sm:-bottom-28 sm:w-52" />

            {/* Right abstract geometry */}
            <div className="absolute -right-16 -top-28 aspect-square w-64 rotate-45 rounded-[3rem] border border-blue-200/10 bg-gradient-to-br from-blue-300/[0.12] to-transparent sm:-right-10 sm:-top-36 sm:w-80" />

            <div className="absolute -bottom-36 right-12 aspect-square w-64 rotate-45 rounded-[3rem] border border-blue-300/10 bg-gradient-to-br from-blue-400/[0.12] to-transparent sm:right-24 sm:w-80" />

            {/* Blue ambient light */}
            <div className="absolute right-0 top-0 aspect-square w-64 rounded-full bg-blue-500/15 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-7 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-xl">
              <span className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                <span className="inline-block aspect-square w-1.5 rounded-full bg-blue-400" />
                Let&apos;s work together
              </span>

              <h2 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[32px]">
                Let&apos;s Build Something
                <br className="hidden sm:block" />
                Great Together.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-blue-100/80">
                Have a project in mind? Get in touch with our team and
                let&apos;s turn your ideas into reality.
              </p>
            </div>

            <div className="relative shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#14213D] shadow-lg shadow-black/10 transition-colors duration-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#14213D]"
              >
                Get in Touch
                <ArrowRightIcon
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          {/* Decorative bottom accent */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 z-0 h-1 w-1/3 bg-gradient-to-l from-blue-400/70 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
