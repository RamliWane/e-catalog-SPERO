import type { ReactElement } from "react";

import MonitorIcon from "@/app/components/icons/Monitor";
import SmartphoneIcon from "@/app/components/icons/Smartphone";
import WorkflowIcon from "@/app/components/icons/Workflow";
import CloudIcon from "@/app/components/icons/Cloud";

type IconComponent = (props: { className?: string }) => ReactElement;

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
  return (
    <a
      href="#"
      className="group flex flex-col bg-white border border-[#E5EAF0] rounded-xl p-4 min-h-[240px] transition-all duration-200 hover:border-slate-900 hover:-translate-y-[3px] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183B56] focus-visible:ring-offset-2"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg mb-3" style={{ backgroundColor: accent }}>
        <Icon className={`w-5 h-5 text-${accentText === "#2563EB" ? "blue-600" : accentText === "#10B981" ? "emerald-600" : accentText === "#EF4444" ? "rose-600" : "purple-600"}`} />
      </div>
      <h3 className="text-[15px] font-semibold text-slate-900 mb-2 leading-tight group-hover:text-[#183B56] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-[13px] text-slate-600 mb-4 leading-relaxed flex-1">
        {desc}
      </p>
      <div className="mt-auto flex items-center gap-2">
        <span className="text-[11px] font-medium text-slate-500">{count}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-900 transition-all duration-200 group-hover:translate-x-0.5">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </a>
  );
}

export default function BrowseByCategory() {
  return (
    <section className="bg-white py-[60px] px-[32px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px]">
          <div className="lg:col-span-3 min-w-0">
            <span className="inline-block mb-[16px] text-[11px] font-medium text-slate-500 uppercase tracking-widest">
              BROWSE BY CATEGORY
            </span>
            <h2 className="text-[28px] font-semibold text-slate-900 leading-tight mb-[16px]">
              Find the Right Solution for Your Business
            </h2>
            <p className="text-[14px] text-slate-600 leading-relaxed mb-[24px]">
              Explore our catalog by category and discover the right expertise for your project.
            </p>
            <a
              href="#"
              className="text-[13px] font-medium text-[#183B56] flex items-center gap-1.5 hover:translate-x-1 transition-transform duration-200 focus-visible:outline-none focus-visible:underline"
            >
              View All Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="bg-[#183B56] text-white rounded-xl p-[24px] min-h-[320px] flex flex-col justify-between">
              <div>
                <span className="inline-block mb-[12px] text-[11px] font-medium text-[#93C5FD] uppercase tracking-widest">
                  FEATURED SOLUTION
                </span>
                <h3 className="text-[20px] font-semibold leading-tight mb-[16px]">
                  Modern Web Platform for Growing Business
                </h3>
                <p className="text-[13px] text-[#CBD5E1] leading-relaxed mb-[24px]">
                  Scalable, secure, and built for long-term success.
                </p>
              </div>
              <a
                href="#"
                className="text-[13px] font-medium text-white flex items-center gap-1.5 hover:translate-x-1 transition-transform duration-200 focus-visible:outline-none focus-visible:underline"
              >
                Explore Project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
