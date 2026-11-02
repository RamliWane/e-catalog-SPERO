import CatalogCard from "./catalog-card";

const CATALOG_DATA = [
  {
    category: "Web Development",
    title: "Spero Dashboard",
    desc: "A modern and scalable dashboard solution for your business needs.",
    accent: "#2563EB",
  },
  {
    category: "Mobile App",
    title: "Finora Mobile App",
    desc: "A personal finance application designed to simplify financial management.",
    accent: "#10B981",
  },
  {
    category: "Cloud & DevOps",
    title: "Nova Cloud",
    desc: "Cloud infrastructure and deployment solutions for modern businesses.",
    accent: "#6366F1",
  },
  {
    category: "UI/UX Design",
    title: "Aurora Design System",
    desc: "A comprehensive design system for building consistent digital experiences.",
    accent: "#EC4899",
  },
  {
    category: "Data & Analytics",
    title: "Insight Pro",
    desc: "Transform complex data into actionable business insights.",
    accent: "#F59E0B",
  },
  {
    category: "Web Development",
    title: "NextGen Website",
    desc: "High-performance websites built for growing businesses.",
    accent: "#2563EB",
  },
  {
    category: "Others",
    title: "API Gateway",
    desc: "Reliable API infrastructure for seamless integrations.",
    accent: "#8B5CF6",
  },
  {
    category: "Cloud & DevOps",
    title: "DevOps Toolkit",
    desc: "Streamline development and deployment workflows.",
    accent: "#10B981",
  },
];

export default function CatalogGrid() {
  return (
    <section className="bg-white px-[32px] pb-[64px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
          {CATALOG_DATA.map((item, i) => (
            <CatalogCard
              key={i}
              category={item.category}
              title={item.title}
              desc={item.desc}
              image={
                <div className="relative w-full h-[220px] rounded-t-[12px] overflow-hidden bg-[#F5F7FA]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef2ff_0%,#ffffff_100%)]" />
                  <div className="absolute top-[15%] left-[10%] w-[60px] h-[4px] rounded-full bg-blue-100" />
                  <div className="absolute top-[25%] left-[10%] w-[40px] h-[4px] rounded-full bg-blue-50" />
                  <div className="absolute top-[35%] right-[10%] w-[80px] h-[60px] rounded-lg bg-blue-50 border border-blue-100" />
                  <div className="absolute bottom-[15%] left-[10%] w-[100px] h-[70px] rounded-lg bg-[#E5EAF2] border border-[#CFD8E2]" />
                  <div className="absolute bottom-[20%] right-[10%] w-[4px] h-[4px] rounded-full bg-blue-200" />
                  <div className="absolute bottom-[20%] right-[16%] w-[4px] h-[4px] rounded-full bg-blue-200" />
                  <div className="absolute bottom-[20%] right-[22%] w-[4px] h-[4px] rounded-full bg-blue-200" />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
