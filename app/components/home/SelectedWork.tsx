
import Image from "next/image";
import { ArrowRightIcon } from "@/lib/icons";

type SecondaryProject = {
  title: string;
  description: string;
  image: string;
};

const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    title: "Fintech Mobile App",
    description: "Secure and seamless financial solutions.",
    image: "/dummy-image-catalog.jpeg",
  },
  {
    title: "Healthcare Platform",
    description: "Better care through technology.",
    image: "/dummy-image-catalog.jpeg",
  },
];

export default function SelectedWork() {
  return (
<section className="bg-white pt-8 pb-[60px] px-[30px]">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Layout */}
        <div className="grid grid-cols-[minmax(220px,0.8fr)_minmax(0,2.5fr)] gap-[56px] items-stretch">

          {/* Left Editorial Content */}
          <div className="flex flex-col min-w-0">
            <span className="inline-block mb-3 text-[11px] font-medium text-slate-500 uppercase tracking-widest">
              SELECTED WORK
            </span>

            <h2 className="text-[40px] font-bold leading-tight text-[#14213D] tracking-tight">
              Real Projects.
              <br />
              Real Impact.
            </h2>

            <p className="mt-4 text-[15px] text-[#526786] leading-relaxed max-w-[520px]">
              Explore some of our most impactful projects. From modern web
              applications to scalable cloud solutions.
            </p>

            {/* CTA */}
            <a
              href="#"
              className="mt-[24px] inline-flex w-fit items-center gap-2 rounded-full border border-transparent bg-[#101B35] px-5 py-3 text-[13px] font-medium text-white transition-colors duration-200 hover:border-[#101B35] hover:bg-white hover:text-[#101B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              View All Projects
              <ArrowRightIcon size={14} />
            </a>
          </div>

          {/* Project Showcase */}
          <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-4 min-w-0 h-full">

            {/* Featured Project */}
            <div className="relative h-full min-h-0 min-w-0 overflow-hidden rounded-2xl bg-[#101B35] group">
              <Image
                src="/asset-catalog-3.png"
                alt="Enterprise Dashboard"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                priority
              />

              {/* Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101B35]/90 via-[#101B35]/20 to-transparent pointer-events-none" />

              {/* Featured Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center rounded-full bg-[#101B35]/75 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                  Featured Project
                </span>
              </div>

              {/* Project Information */}
              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-4 p-5">
                <div className="min-w-0">
                  <h3 className="text-[17px] font-semibold text-white leading-tight">
                    Enterprise Dashboard
                  </h3>

                  <p className="mt-1 text-[12px] text-white/80 leading-relaxed">
                    A powerful analytics dashboard for modern businesses.
                  </p>
                </div>

                <ArrowRightIcon
                  size={17}
                  className="shrink-0 text-white transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </div>

            {/* Secondary Projects Column */}
            <div className="grid grid-rows-2 gap-4 min-w-0 h-full">
              {SECONDARY_PROJECTS.map((project) => (
                <div
                  key={project.title}
                  className="group relative grid grid-cols-[42%_1fr] min-w-0 min-h-0 h-full overflow-hidden rounded-xl border border-[#DCE6F5] bg-gradient-to-r from-white via-[#F1F6FF] to-[#A8D1FF] transition-colors duration-200 hover:border-[#B8CCF5]"
                >
                  {/* Project Image */}
                  <div className="relative min-w-0 h-full overflow-hidden bg-[#F1F5FB]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 20vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105 [mask-image:linear-gradient(to_left,transparent,black_45%)]"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="relative flex min-w-0 flex-col justify-center px-4 py-4 pr-8">
                    <h4 className="text-[14px] font-semibold text-[#14213D] leading-snug">
                      {project.title}
                    </h4>

                    <p className="mt-2 text-[11px] text-[#64748B] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Arrow */}
                    <div className="absolute bottom-4 right-3 text-[#64748B] transition-colors duration-200 group-hover:text-[#2463FF]">
                      <ArrowRightIcon
                        size={13}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
