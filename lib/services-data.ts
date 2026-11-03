export type ServiceCategory =
  | "All Services"
  | "Design"
  | "Development"
  | "Cloud & DevOps"
  | "Consulting"

export type Service = {
  id: string
  number: string
  title: string
  eyebrow: string
  description: string
  tags: string[]
  category: ServiceCategory
  image?: string
  href?: string
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "All Services",
  "Design",
  "Development",
  "Cloud & DevOps",
  "Consulting",
]

export const SERVICES: Service[] = [
  {
    id: "1",
    number: "01",
    title: "Web Development",
    eyebrow: "01. WEB DEVELOPMENT",
    description:
      "Build high-performance, scalable, and secure web applications tailored to your business needs.",
    tags: ["Corporate Website", "Web App", "E-Commerce", "Dashboard"],
    category: "Development",
  },
  {
    id: "2",
    number: "02",
    title: "Mobile App Development",
    eyebrow: "02. MOBILE APP DEVELOPMENT",
    description:
      "Develop intuitive mobile applications for iOS and Android with reliable performance.",
    tags: ["iOS", "Android", "Cross-platform", "Mobile Product"],
    category: "Development",
  },
  {
    id: "3",
    number: "03",
    title: "UI/UX & Product Design",
    eyebrow: "03. UI/UX & PRODUCT DESIGN",
    description:
      "Create intuitive digital experiences through research, interface design, and product strategy.",
    tags: ["UX Research", "UI Design", "Prototyping", "Design System"],
    category: "Design",
  },
  {
    id: "4",
    number: "04",
    title: "Cloud & DevOps",
    eyebrow: "04. CLOUD & DEVOPS",
    description:
      "Build reliable infrastructure and streamlined deployment workflows for growing products.",
    tags: ["Cloud Infrastructure", "CI/CD", "DevOps", "Monitoring"],
    category: "Cloud & DevOps",
  },
  {
    id: "5",
    number: "05",
    title: "IT Consulting",
    eyebrow: "05. IT CONSULTING",
    description:
      "Align technology decisions with business goals through practical strategy and technical guidance.",
    tags: ["Technology Strategy", "Architecture", "Audit", "Digital Transformation"],
    category: "Consulting",
  },
  {
    id: "6",
    number: "06",
    title: "AI & Automation",
    eyebrow: "06. AI & AUTOMATION",
    description:
      "Improve productivity with intelligent workflows, AI-powered features, and process automation.",
    tags: ["AI Integration", "Automation", "AI Workflow", "Data Processing"],
    category: "Development",
  },
]

export const FILTER_CATEGORIES: ServiceCategory[] = [
  "All Services",
  "Design",
  "Development",
  "Cloud & DevOps",
  "Consulting",
]
