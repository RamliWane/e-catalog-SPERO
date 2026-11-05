
import Image from "next/image";

const ABOUT_METRICS = [
  { value: "120+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "5+", label: "Years of Experience" },
];

const PROCESS_STEPS = [
  { number: "1", title: "Discover" },
  { number: "2", title: "Plan" },
  { number: "3", title: "Design" },
  { number: "4", title: "Develop" },
  { number: "5", title: "Launch" },
];

export default function AboutProcess() {
  return (
    <section className="bg-white px-[30px] py-[60px]">
      <div className="mx-auto max-w-[1400px]">

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.05fr_1.35fr] lg:gap-8">

          {/* LEFT: COMPANY IMAGE */}
          <div className="relative min-w-0">
            {/* Decorative Shape */}
            <div className="absolute -left-[8px] -top-[8px] h-[48%] w-[48%] bg-[#B9D0F5] opacity-70" />

            {/* Image */}
            <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[5px]">
              <Image
                src="/aboutprocess-asset-home.jpeg"
                alt="Spero team working together"
                fill
                sizes="(max-width: 1024px) 100vw, 28vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* CENTER: ABOUT SPERO */}
          <div className="flex min-w-0 flex-col justify-center lg:px-2">

            <span className="inline-block mb-[12px] text-[11px] font-medium text-slate-500 uppercase tracking-widest">
              ABOUT SPERO
            </span>

            <h2 className="mb-[12px] text-[22px] font-bold leading-[1.2] tracking-tight text-[#14213D]">
              A Technology Partner
              <br />
              for Your Next Growth.
            </h2>

            <p className="mb-[20px] max-w-[340px] text-[12px] leading-[1.55] text-[#64748B]">
              We're a team of passionate developers, designers, and
              strategists, committed to turning bold ideas into
              real-world impact.
            </p>

            {/* Company Metrics */}
            <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
              {ABOUT_METRICS.map((metric) => (
                <div
                  key={metric.value}
                  className="flex min-w-0 flex-col gap-[5px]"
                >
                  <span className="text-[21px] font-bold leading-none text-[#14213D]">
                    {metric.value}
                  </span>

                  <span className="text-[9px] font-medium leading-tight text-[#64748B]">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: OUR PROCESS */}
          <div className="flex min-w-0 flex-col justify-center border-t border-[#DCE4EF] pt-8 lg:h-full lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

            <span className="inline-block mb-[12px] text-[11px] font-medium text-slate-500 uppercase tracking-widest">
              OUR PROCESS
            </span>

            <h2 className="mb-[12px] text-[22px] font-bold leading-[1.2] tracking-tight text-[#14213D]">
              A Clear Process,
              <br />
              A Better Result.
            </h2>

            <p className="mb-[24px] max-w-[340px] text-[12px] leading-[1.55] text-[#64748B]">
              Our streamlined process ensures transparency,
              collaboration, and results.
            </p>

            {/* Horizontal Process Timeline */}
            <div className="relative mt-1">

              {/* Connector Line */}
              <div className="absolute left-[10%] right-[10%] top-[14px] h-px bg-[#B8CEF2]" />

              {/* Timeline Steps */}
              <div className="relative z-10 grid grid-cols-5">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="flex min-w-0 flex-col items-center"
                  >
                    {/* Number Circle */}
                    <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#DCEAFF] bg-[#EAF2FF]">
                      <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#2878F0] text-[9px] font-semibold text-white">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Label */}
                    <span className="mt-[10px] whitespace-nowrap text-center text-[9px] font-medium text-[#526786]">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
