import { DEFAULT_HERO_CONTENT, type HeroContent } from "@/lib/home-hero-data"

export { HERO_VISUAL_OPTIONS } from "@/lib/home-hero-data"
export type {
  HeroContent,
  HeroFloatingCard,
  HeroIconKey,
  HeroTag,
} from "@/lib/home-hero-data"

export type HomepageSectionId =
  | "hero"
  | "browse"
  | "selected-work"
  | "about"
  | "clients"
  | "cta"

export type HomepageVisibility = "Visible" | "Hidden"

export type HomepageSectionMeta = {
  id: HomepageSectionId
  name: string
  description: string
  typeLabel: string
}

export const HOMEPAGE_SECTION_META: HomepageSectionMeta[] = [
  {
    id: "hero",
    name: "Hero Section",
    description: "Hero banner, search prompt, and floating service cards.",
    typeLabel: "Hero",
  },
  {
    id: "browse",
    name: "Browse by Category",
    description: "Category shortcuts and the embedded featured solution card.",
    typeLabel: "Category grid",
  },
  {
    id: "selected-work",
    name: "Selected Work",
    description: "Featured project and supporting case study cards.",
    typeLabel: "Project showcase",
  },
  {
    id: "about",
    name: "About & Process",
    description: "Company introduction, metrics, and delivery process.",
    typeLabel: "About / Process",
  },
  {
    id: "clients",
    name: "Partners / Clients",
    description: "Client and partner logo marquee.",
    typeLabel: "Logo marquee",
  },
  {
    id: "cta",
    name: "Bottom CTA",
    description: "Closing call-to-action with contact button.",
    typeLabel: "Call to action",
  },
]

export type AssetOption = {
  label: string
  value: string
}

export const PROJECT_IMAGE_OPTIONS: AssetOption[] = [
  { label: "Enterprise dashboard", value: "/asset-catalog-3.png" },
  { label: "Catalog preview", value: "/dummy-image-catalog.jpeg" },
  { label: "Catalog preview 2", value: "/asset-catalog-2.jpeg" },
  { label: "Catalog visual", value: "/main-asset-catalog.png" },
  { label: "Services visual", value: "/services-asset-1.png" },
  { label: "Home visual 2", value: "/main-home-asset-2.png" },
]

export const ABOUT_IMAGE_OPTIONS: AssetOption[] = [
  { label: "Team photo (current)", value: "/aboutprocess-asset-home.jpeg" },
  { label: "Home visual 2", value: "/main-home-asset-2.png" },
  { label: "Section visual 2", value: "/asset-section-2.png" },
  { label: "Section visual 3", value: "/asset-section-3.png" },
]

export const CLIENT_LOGO_OPTIONS: AssetOption[] = [
  { label: "Astra", value: "/logo/astra-logo.png" },
  { label: "Kominfo", value: "/logo/kominfo-logo.png" },
  { label: "Atlantis Plus", value: "/logo/logo-atlantis-plus.png" },
  { label: "Blu Speed", value: "/logo/logo-blu-speed.png" },
  { label: "Kamenparekraf", value: "/logo/logo-kamenparekraf.png" },
  { label: "Kapal Api", value: "/logo/logo-kapalapi.png" },
  { label: "One Lito", value: "/logo/logo-one-lito.png" },
  { label: "Pelni", value: "/logo/logo-pelni.png" },
  { label: "Telkom", value: "/logo/logo-telkom.png" },
  { label: "Win Shop", value: "/logo/logo-win-shop.png" },
  { label: "Waskita", value: "/logo/logo-waskita.png" },
]

export type BrowseCategoryContent = {
  id: string
  iconKey: "web" | "mobile" | "design" | "cloud"
  title: string
  description: string
  count: string
}

export type FeaturedSolutionContent = {
  label: string
  title: string
  description: string
  buttonLabel: string
  image: string
}

export type BrowseContent = {
  eyebrow: string
  heading: string
  description: string
  linkLabel: string
  categories: BrowseCategoryContent[]
  featuredSolution: FeaturedSolutionContent
}

export type SelectedProjectContent = {
  id: string
  title: string
  description: string
  image: string
}

export type SelectedWorkContent = {
  eyebrow: string
  headingLine1: string
  headingLine2: string
  description: string
  buttonLabel: string
  buttonHref: string
  featuredBadge: string
  featuredTitle: string
  featuredDescription: string
  featuredImage: string
  secondaryProjects: SelectedProjectContent[]
}

export type AboutMetricContent = {
  id: string
  value: string
  label: string
}

export type ProcessStepContent = {
  id: string
  number: string
  title: string
}

export type AboutContent = {
  image: string
  aboutEyebrow: string
  aboutHeadingLine1: string
  aboutHeadingLine2: string
  aboutDescription: string
  metrics: AboutMetricContent[]
  processEyebrow: string
  processHeadingLine1: string
  processHeadingLine2: string
  processDescription: string
  steps: ProcessStepContent[]
}

export type ClientLogoContent = {
  id: string
  name: string
  src: string
  visible: boolean
}

export type ClientsContent = {
  logos: ClientLogoContent[]
}

export type CtaContent = {
  headingLine1: string
  headingLine2: string
  description: string
  buttonLabel: string
  buttonHref: string
}

export type HomepageContentMap = {
  hero: HeroContent
  browse: BrowseContent
  "selected-work": SelectedWorkContent
  about: AboutContent
  clients: ClientsContent
  cta: CtaContent
}

export type HomepageEditorState = {
  order: HomepageSectionId[]
  visibility: Record<HomepageSectionId, HomepageVisibility>
  content: HomepageContentMap
}

export const DEFAULT_HOMEPAGE_STATE: HomepageEditorState = {
  order: [
    "hero",
    "browse",
    "selected-work",
    "about",
    "clients",
    "cta",
  ],
  visibility: {
    hero: "Visible",
    browse: "Visible",
    "selected-work": "Visible",
    about: "Visible",
    clients: "Visible",
    cta: "Visible",
  },
  content: {
    hero: DEFAULT_HERO_CONTENT,
    browse: {
      eyebrow: "BROWSE BY CATEGORY",
      heading: "Find the Right Solution for Your Business",
      description:
        "Explore our catalog by category and discover the right expertise for your project.",
      linkLabel: "View All Services",
      categories: [
        {
          id: "web-development",
          iconKey: "web",
          title: "Web Development",
          description:
            "Custom websites, web apps, and e-commerce solutions.",
          count: "12+ companies",
        },
        {
          id: "mobile-app",
          iconKey: "mobile",
          title: "Mobile App",
          description: "iOS and Android apps, from MVP to enterprise.",
          count: "10+ companies",
        },
        {
          id: "ui-ux-design",
          iconKey: "design",
          title: "UI/UX Design",
          description: "User-centered design for better experiences.",
          count: "8+ companies",
        },
        {
          id: "cloud-devops",
          iconKey: "cloud",
          title: "Cloud & DevOps",
          description:
            "Infrastructure, deployment, and system optimization.",
          count: "6+ companies",
        },
      ],
      featuredSolution: {
        label: "Featured Solution",
        title: "Modern Web Platform for Growing Business",
        description: "Scalable, secure, and built for long-term success.",
        buttonLabel: "Explore Project",
        image: "/asset-section-3.png",
      },
    },
    "selected-work": {
      eyebrow: "SELECTED WORK",
      headingLine1: "Real Projects.",
      headingLine2: "Real Impact.",
      description:
        "Explore some of our most impactful projects. From modern web applications to scalable cloud solutions.",
      buttonLabel: "View All Projects",
      buttonHref: "#",
      featuredBadge: "Featured Project",
      featuredTitle: "Enterprise Dashboard",
      featuredDescription:
        "A powerful analytics dashboard for modern businesses.",
      featuredImage: "/asset-catalog-3.png",
      secondaryProjects: [
        {
          id: "fintech-mobile-app",
          title: "Fintech Mobile App",
          description: "Secure and seamless financial solutions.",
          image: "/dummy-image-catalog.jpeg",
        },
        {
          id: "healthcare-platform",
          title: "Healthcare Platform",
          description: "Better care through technology.",
          image: "/dummy-image-catalog.jpeg",
        },
      ],
    },
    about: {
      image: "/aboutprocess-asset-home.jpeg",
      aboutEyebrow: "ABOUT SPERO",
      aboutHeadingLine1: "A Technology Partner",
      aboutHeadingLine2: "for Your Next Growth.",
      aboutDescription:
        "We're a team of passionate developers, designers, and strategists, committed to turning bold ideas into real-world impact.",
      metrics: [
        { id: "projects", value: "120+", label: "Projects Delivered" },
        { id: "clients", value: "50+", label: "Happy Clients" },
        { id: "experience", value: "5+", label: "Years of Experience" },
      ],
      processEyebrow: "OUR PROCESS",
      processHeadingLine1: "A Clear Process,",
      processHeadingLine2: "A Better Result.",
      processDescription:
        "Our streamlined process ensures transparency, collaboration, and results.",
      steps: [
        { id: "discover", number: "1", title: "Discover" },
        { id: "plan", number: "2", title: "Plan" },
        { id: "design", number: "3", title: "Design" },
        { id: "develop", number: "4", title: "Develop" },
        { id: "launch", number: "5", title: "Launch" },
      ],
    },
    clients: {
      logos: [
        {
          id: "astra",
          name: "Astra",
          src: "/logo/astra-logo.png",
          visible: true,
        },
        {
          id: "kominfo",
          name: "Kominfo",
          src: "/logo/kominfo-logo.png",
          visible: true,
        },
        {
          id: "atlantis-plus",
          name: "Atlantis Plus",
          src: "/logo/logo-atlantis-plus.png",
          visible: true,
        },
        {
          id: "blu-speed",
          name: "Blu Speed",
          src: "/logo/logo-blu-speed.png",
          visible: true,
        },
        {
          id: "kamenparekraf",
          name: "Kamenparekraf",
          src: "/logo/logo-kamenparekraf.png",
          visible: true,
        },
        {
          id: "kapal-api",
          name: "Kapal Api",
          src: "/logo/logo-kapalapi.png",
          visible: true,
        },
        {
          id: "one-lito",
          name: "One Lito",
          src: "/logo/logo-one-lito.png",
          visible: true,
        },
        {
          id: "pelni",
          name: "Pelni",
          src: "/logo/logo-pelni.png",
          visible: true,
        },
        {
          id: "telkom",
          name: "Telkom",
          src: "/logo/logo-telkom.png",
          visible: true,
        },
        {
          id: "win-shop",
          name: "Win Shop",
          src: "/logo/logo-win-shop.png",
          visible: true,
        },
        {
          id: "waskita",
          name: "Waskita",
          src: "/logo/logo-waskita.png",
          visible: true,
        },
      ],
    },
    cta: {
      headingLine1: "Let's Build Something",
      headingLine2: "Great Together.",
      description:
        "Have a project in mind? Get in touch with our team and let's turn your ideas into reality.",
      buttonLabel: "Get in Touch",
      buttonHref: "#contact",
    },
  },
}

export function cloneHomepageState(state: HomepageEditorState) {
  return JSON.parse(JSON.stringify(state)) as HomepageEditorState
}

export function createInitialHomepageState() {
  return cloneHomepageState(DEFAULT_HOMEPAGE_STATE)
}
