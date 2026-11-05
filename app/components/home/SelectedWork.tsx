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
    <section className="bg-white py-[60px] px-[30px]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-[60px] items-start">
          {/* Left Content */}
          <div className="flex flex-col gap-6 min-w-0">
            <span className="inline-block text-[11px] font-medium text-blue-600 uppercase tracking-[0.2em]">
              SELECTED WORK
            </span>
            <h2 className="text-[40px] font-bold leading-tight text-[#14213D] tracking-tight">
              Real Projects.<br />
              Real Impact.
            </h2>
            <p className="text-[15px] text-[#526786] leading-relaxed max-w-[520px] mt-[16px]">
              Explore some of our most impactful projects. From modern web
              applications to scalable cloud solutions.
            </p>
            <a
              href="#"
              className="mt-[24px] inline-flex items-center gap-2 rounded-full border border-[#101B35] bg-[#101B35] text-white px-5 py-2.5 text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 hover:bg-[#0f172a]"
            >
              View All Projects
              <ArrowRightIcon size={14} className="transition-transform duration-200 hover:translate-x-0.5" />
            </a>
          </div>

          {/* Right: Project Showcase */}
          <div className="flex flex-col gap-[24px] min-w-0">
            {/* Featured Project */}
            <div className="relative overflow-hidden rounded-[16px] bg-[#101B35] h-[420px] aspect-[16/9]">
              <Image
                src="/asset-catalog-3.png"
                alt="Enterprise Dashboard"
                fill
                sizes="100vw"
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-[4px]">
                    Featured Project
                  </span>
                  <h3 className="text-[22px] font-bold text-white leading-tight">
                    Enterprise Dashboard
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <ArrowRightIcon size={16} className="text-white" />
                </div>
              </div>
            </div>

            {/* Secondary Projects */}
            <div className="flex flex-col gap-[24px]">
              {SECONDARY_PROJECTS.map((project, index) => (
                <div
                  key={project.title}
                  className="relative overflow-hidden rounded-[12px] border border-[#E2EAF5] bg-white h-[120px] flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-[40%] h-full overflow-hidden rounded-t-[12px] md:rounded-t-none md:rounded-l-[12px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="w-full md:w-[60%] p-6 flex flex-col justify-center">
                    <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-widest">
                      Project {index + 2}
                    </span>
                    <h4 className="text-[17px] font-bold text-[#14213D] leading-tight mt-[2px]">
                      {project.title}
                    </h4>
                    <p className="text-[13px] text-[#526786] leading-relaxed mt-[4px] max-w-[280px]">
                      {project.description}
                    </p>
                  </div>
                  <div className="absolute bottom-[20px] right-[20px] md:bottom-[24px] md:right-[24px] flex items-center gap-2 text-[#2463FF] hover:text-[#0f172a] transition-colors duration-200">
                    <ArrowRightIcon size={14} />
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
