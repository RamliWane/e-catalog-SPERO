import Sidebar from "./components/layout/Sidebar";
import TopNavbar from "./components/layout/TopNavbar";

export default function Home() {
  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <Sidebar />
      <div className="ml-[230px] flex-1 flex flex-col min-h-0">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8 sm:p-12">
          <div className="flex flex-col items-center justify-center min-h-full py-32 px-16 sm:items-start sm:text-left">
            <div className="flex flex-col gap-6 text-center sm:items-start sm:text-left">
              <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Selamat datang di Spero
              </h1>
              <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Platform katalog software house, IT consultant, layanan teknologi,
                dan solusi digital.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
