import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";

export default function SolutionsPage() {
  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <Sidebar />
      <div className="ml-[230px] flex-1 flex flex-col min-h-0">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-8 sm:p-12">
          <div className="flex flex-col items-center justify-center min-h-full py-32 px-16 sm:items-start sm:text-left">
            <div className="flex flex-col gap-6 text-center sm:items-start sm:text-left">
              <span className="inline-block text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                Solutions
              </span>
              <h1 className="text-[36px] lg:text-[44px] font-semibold text-slate-900 leading-tight">
                Solutions
              </h1>
              <p className="text-[14px] text-slate-600 leading-relaxed max-w-[460px]">
                Tailored digital solutions for your business needs, from
                web development to cloud infrastructure.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
