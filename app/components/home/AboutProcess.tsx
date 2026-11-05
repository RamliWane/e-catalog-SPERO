import Image from "next/image";

const ABOUT_METRICS = [
  { value: "120+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "5+", label: "Years of Experience" },
];

const PROCESS_STEPS = [
  { number: "01", title: "Discover" },
  { number: "02", title: "Plan" },
  { number: "03", title: "Design" },
  { number: "04", title: "Develop" },
  { number: "05", title: "Launch" },
];

export default function AboutProcess() {
  return (
    <section className="bg-white py-[60px] px-[30px]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-[28%_32%_40%] gap-[40px] items-start">
          {/* Left: Company Image */}
          <div className="relative min-w-0">
            <div className="absolute -inset-[6px] bg-[#B9D0F5] opacity-60 rounded-[8px] pointer-events-none z-0" />
            <div className="relative z-10 overflow-hidden rounded-[6px]">
              <Image
                src="/asset-section-3.png"
                alt="Spero team working together"
                className="w-full h-full object-cover object-center"
                fill
                sizes="(max-width: 768px) 100vw, 28vw"
              />
            </div>
          </div>

          {/* Center: About Spero */}
          <div className="flex flex-col gap-[24px] min-w-0 border-l border-[#DCE4EF] pl-[32px] py-[8px]">
            <span className="inline-block text-[11px] font-medium text-[#2878F0] uppercase tracking-[0.2em]">
              ABOUT SPERO
            </span>
            <h2 className="text-[22px] font-bold leading-[1.15] text-[#14213D] tracking-tight mb-[12px] max-w-[340px]">
              A Technology Partner<br />
              for Your Next Growth&apos;.
            </h2>
            <p className="text-[13px] text-[#64748B] leading-[1.6] mb-[28px] max-w-[340px]">
              We&apos;re a team of passionate developers, designers, and strategists,
              committed to turning bold ideas into real-world impact.
            </p>

            {/* Trust Statistics */}
            <div className="flex gap-[24px]">
              {ABOUT_METRICS.map((metric) => (
                <div key={metric.value} className="flex flex-col gap-[4px]">
                  <span className="text-[23px] font-bold text-[#14213D] leading-none">
                    {metric.value}
                  </span>
                  <span className="text-[10px] font-medium text-[#64748B] leading-none">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Our Process */}
          <div className="flex flex-col gap-[24px] min-w-0">
            <span className="inline-block text-[11px] font-medium text-[#2878F0] uppercase tracking-[0.2em]">
              OUR PROCESS
            </span>
            <h2 className="text-[22px] font-bold leading-[1.15] text-[#14213D] tracking-tight mb-[12px]">
              A Clear Process,<br />
              A Better Result.
            </h2>
            <p className="text-[13px] text-[#64748B] leading-relaxed max-w-[340px] mb-[28px]">
              Our streamlined process ensures transparency, collaboration,
              and results.
            </p>

            {/* Process Timeline */}
            <div className="relative flex flex-col gap-[20px]">
              {PROCESS_STEPS.map((step, index) => {
                return (
                  <div
                    key={step.number}
                    className="relative flex flex-col items-center"
                  >
                    {/* Connector line between steps */}
                    {index > 0 && (
                      <div
                        className="absolute -top-[10px] left-[50%] w-[1px] h-[10px] bg-[#B8CEF2]"
                        style={{ transform: "translateX(-50%)" }}
                      />
                    )}
                    <div className="relative z-10">
                      <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#EAF2FF] border border-[#B8CEF2]/50">
                        <span className="text-[11px] font-semibold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <span className="mt-[10px] text-[10px] font-medium text-[#526786] text-center leading-none whitespace-nowrap">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
