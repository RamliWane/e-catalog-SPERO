import type { ReactElement } from "react";

import {
  SearchIcon,
  Code2Icon,
  SmartphoneIcon,
  ShapesIcon,
  CloudIcon,
  ArrowRightIcon,
} from "@/lib/icons";

const POPULAR_TAGS = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Cloud Solutions",
];

const STATS = [
  { value: "200+", label: "Tech Solutions" },
  { value: "50+", label: "Trusted Partners" },
  { value: "10+", label: "Years of Experience" },
];

const SERVICE_CARDS = [
  { icon: Code2Icon, title: "Web Development", desc: "Modern, scalable, and high-performance web solutions.", top: "10%", left: "8%", delay: "0s" },
  { icon: SmartphoneIcon, title: "Mobile App", desc: "iOS & Android apps that people love to use.", top: "30%", right: "10%", delay: "0.2s" },
  { icon: ShapesIcon, title: "UI/UX Design", desc: "Designing intuitive experiences for real people.", bottom: "20%", left: "12%", delay: "0.4s" },
  { icon: CloudIcon, title: "Cloud & DevOps", desc: "Build, deploy, and scale with confidence.", bottom: "8%", right: "12%", delay: "0.6s" },
];

type IconComponent = (props: { className?: string; size?: number }) => ReactElement;

function FloatingCard({ icon: Icon, title, desc, ...position }: {
  icon: IconComponent;
  title: string;
  desc: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  delay: string;
}) {
  return (
    <div
      className="absolute bg-white border border-[#E5EAF0] rounded-xl p-4 shadow-sm flex flex-col items-start gap-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      style={{
        ...position,
        animationDelay: position.delay ? `${position.delay}` : undefined,
      }}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#DBEAFE] text-[#2563EB] mb-1">
        <Icon size={12} />
      </div>
      <h4 className="text-[12px] font-medium text-slate-900 leading-tight">{title}</h4>
      <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
      <div className="mt-auto w-full h-[1px] bg-[#E5EAF0] mt-2 flex items-end">
        <ArrowRightIcon size={10} className="text-slate-400 ml-auto" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-white py-[60px] px-[32px] min-h-[520px] flex flex-col lg:flex-row gap-[60px] items-start">
      <div className="flex-1 min-w-0 max-w-[560px]">
        <span className="inline-block mb-[13px] text-[11px] font-medium text-slate-500 uppercase tracking-widest">
          SOFTWARE HOUSE & IT CONSULTANT
        </span>
        <h1 className="text-[48px] lg:text-[48px] font-semibold text-slate-900 leading-tight mb-[20px] max-w-[520px]">
          Your Trusted Partner for Digital Solutions
        </h1>
        <p className="text-[14px] text-slate-600 leading-relaxed mb-[28px] max-w-[460px]">
          Explore our curated catalog of software houses and IT consultants ready to build, scale, and transform your ideas into digital solutions.
        </p>

        <div className="flex items-center gap-3 bg-white border border-[#E5EAF0] rounded-full h-[52px] max-w-[540px] shrink-0">
          <SearchIcon size={14} className="text-slate-400 ml-3 shrink-0" />
          <input
            type="text"
            placeholder="Search services, technologies, or company..."
            className="flex-1 h-full bg-transparent border-none text-sm text-slate-900 placeholder-slate-400 focus:outline-none pr-3 pl-0 min-w-0"
          />
          <button
            type="button"
            className="w-[40px] h-[40px] rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#0f2a3e] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 mr-1"
            aria-label="Search"
          >
            <ArrowRightIcon size={12} />
          </button>
        </div>

        <div className="mt-[20px] items-center flex flex-wrap gap-3">
          <span className="text-[13px] font-medium text-slate-500  whitespace-nowrap">
            Popular search:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className="text-[11px] font-medium text-slate-700 px-3 py-1 rounded-full border border-[#E5EAF0] bg-white hover:bg-[#F5F7FA] hover:text-slate-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] whitespace-nowrap shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-[32px] flex gap-[30px]">
          {STATS.map((stat) => (
            <div key={stat.value} className="flex items-center gap-2">
              <span className="text-[20px] font-semibold text-slate-900 leading-none">{stat.value}</span>
              <span className="text-[11px] text-slate-500 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative w-full h-full">
          <img src="/main-home-asset-2.png" alt="Hero Image" className="w-full h-full object-cover" />
      </div>
    </section>
  );
}
