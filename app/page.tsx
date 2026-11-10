import Sidebar from "./components/layout/Sidebar";
import TopNavbar from "./components/layout/TopNavbar";
import Hero from "./components/home/Hero";
import ClientLogoMarquee from "./components/home/ClientLogoMarquee";
import SelectedWork from "./components/home/SelectedWork";
import AboutProcess from "./components/home/AboutProcess";
import BottomCTA from "./components/home/BottomCTA";
import BrowseByCategory from "./components/home/BrowseByCategory";
import { getHomepageHero } from "@/lib/homepage-hero";

export default async function Home() {
  const hero = await getHomepageHero();

  return (
    <div className="flex h-screen bg-white font-sans">
      <Sidebar />
      <div className="ml-[230px] flex-1 min-w-0 flex flex-col min-h-0">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto">
          {hero.isVisible ? <Hero content={hero.content} /> : null}
          <BrowseByCategory />
          <SelectedWork />
          <AboutProcess />
          <ClientLogoMarquee />
          <BottomCTA />
        </main>
      </div>
    </div>
  );
}
