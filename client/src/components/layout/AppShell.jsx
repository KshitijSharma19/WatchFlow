import { useState } from "react";
import BackgroundGlow from "../common/BackgroundGlow";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function AppShell({ children, title, showBack = false, showFooter = true }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 dark:bg-[#030005] text-slate-900 dark:text-white transition-colors duration-200 flex flex-col">
      <BackgroundGlow />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main application layout with full screen width */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
        <TopBar
          title={title}
          showBack={showBack}
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="w-full flex-1">
          {children}
        </main>

        {showFooter && <Footer />}
      </div>
    </div>
  );
}
