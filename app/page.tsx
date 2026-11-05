import Sidebar from "./components/layout/Sidebar";
import TopNavbar from "./components/layout/TopNavbar";
import Hero from "./components/home/Hero";
import SelectedWork from "./components/home/SelectedWork";
import AboutProcess from "./components/home/AboutProcess";
import BottomCTA from "./components/home/BottomCTA";
import BrowseByCategory from "./components/home/BrowseByCategory";

export default function Home() {
  return (
    <div className="flex h-screen bg-white font-sans">
      <Sidebar />
      <div className="ml-[230px] flex-1 flex flex-col min-h-0">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto">
          <Hero />
          <BrowseByCategory />
          <SelectedWork />
          <AboutProcess />
          <BottomCTA />
        </main>
      </div>
    </div>
  );
}
