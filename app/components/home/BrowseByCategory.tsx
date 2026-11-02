import type { ReactElement } from "react";

import MonitorIcon from "@/app/components/icons/Monitor";
import SmartphoneIcon from "@/app/components/icons/Smartphone";
import WorkflowIcon from "@/app/components/icons/Workflow";
import CloudIcon from "@/app/components/icons/Cloud";

type IconComponent = (props: { className?: string }) => ReactElement;

function Cube3D({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <polygon
        points="55,10 95,40 55,70 15,40"
        fill="url(#cubeGrad)"
        opacity="0.85"
      />
      <polygon
        points="95,40 95,80 55,70"
        fill="#93C5FD"
        opacity="0.9"
      />
      <polygon
        points="15,40 15,80 55,70"
        fill="#A5B4FC"
        opacity="0.9"
      />
      <line x1="55" y1="10" x2="55" y2="70" stroke="#4F46E5" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

const CATEGORIES = [
  {
    title: "Web Development",
    desc: "Custom websites, web apps, and e-commerce solutions.",
    count: "12+ companies",
    accent: "#DBEAFE",
    accentText: "#2563EB",
    icon: MonitorIcon,
  },
  {
    title: "Mobile App",
    desc: "iOS and Android apps, from MVP to enterprise.",
    count: "10+ companies",
    accent: "#D1FAE5",
    accentText: "#10B981",
    icon: SmartphoneIcon,
  },
  {
    title: "UI/UX Design",
    desc: "User-centered design for better experiences.",
    count: "8+ companies",
    accent: "#FEE2E2",
    accentText: "#EF4444",
    icon: WorkflowIcon,
  },
  {
    title: "Cloud & DevOps",
    desc: "Infrastructure, deployment, and system optimization.",
    count: "6+ companies",
    accent: "#EDE9FE",
    accentText: "#7C3AED",
    icon: CloudIcon,
  },
];

function CategoryCard({ icon: Icon, title, desc, count, accent, accentText }: {
  icon: IconComponent;
  title: string;
  desc: string;
  count: string;
  accent: string;
  accentText: string;
}) {
  const accentColorClass =
    accentText === "#2563EB" ? "text-blue-600" :
    accentText === "#10B981" ? "text-emerald-600" :
    accentText === "#EF4444" ? "text-rose-600" :
    "text-purple-600";

  return (
    <a
      href="#"
      className="flex flex-col bg-white border border-[#E5EAF0] rounded-[11px] p-[14px] w-full shrink-0 min-w-0 transition-all duration-200 hover:border-slate-900 hover:-translate-y-[2px] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] focus-visible:ring-offset-2"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg mb-[10px]" style={{ backgroundColor: accent }}>
        <Icon className={`w-4 h-4 ${accentColorClass}`} />
      </div>
      <h3 className="text-[11px] font-semibold text-slate-900 mb-[6px] leading-tight group-hover:text-[#183B56] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-[9px] text-slate-500 mb-auto leading-[1.5]">
        {desc}
      </p>
      <div className="flex items-center gap-1.5 mt-[4px]">
        <span className="text-[9px] font-medium text-slate-400">{count}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-900 transition-all duration-200 group-hover:translate-x-0.5">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </a>
  );
}

export default function BrowseByCategory() {
  return (
    <section className="bg-white py-[40px] px-[32px]">
      <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-[260px_repeat(4,minmax(130px,1fr))_300px] lg:gap-[16px] min-w-0">
        <div className="min-w-0">
          <span className="inline-block mb-[12px] text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            BROWSE BY CATEGORY
          </span>
          <h2 className="text-[26px] font-semibold text-slate-900 leading-[1.15] mb-[12px]">
            Find the Right Solution for Your Business
          </h2>
          <p className="text-[12px] text-slate-600 leading-[1.6] mb-[16px]">
            Explore our catalog by category and discover the right expertise for your project.
          </p>
          <a
            href="#"
            className="text-[12px] font-medium text-[#183B56] flex items-center gap-1 hover:translate-x-1 transition-transform duration-200 focus-visible:outline-none focus-visible:underline"
          >
            View All Services
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {CATEGORIES.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}

        <div className="min-w-0">
          <div className="relative bg-[#183B56] text-white rounded-[11px] p-[18px] h-[178px] flex flex-col justify-between">
            <div className="relative z-10">
              <span className="inline-block mb-[10px] text-[10px] font-medium text-[#93C5FD] uppercase tracking-widest">
                Featured Solution
              </span>
              <h3 className="text-[16px] font-semibold leading-[1.2] mb-[10px]">
                Modern Web Platform for Growing Business
              </h3>
              <p className="text-[11px] text-[#CBD5E1] leading-[1.6] mb-[14px]">
                Scalable, secure, and built for long-term success.
              </p>
              <a
                href="#"
                className="text-[11px] font-medium text-white flex items-center gap-1 hover:translate-x-1 transition-transform duration-200 focus-visible:outline-none focus-visible:underline"
              >
                Explore Project
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
            <div className="absolute right-[-6px] bottom-[-6px] opacity-40 pointer-events-none">
              <Cube3D className="w-[72px] h-[72px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
