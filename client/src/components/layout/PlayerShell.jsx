import { useState } from "react";
import BackgroundGlow from "../common/BackgroundGlow";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function PlayerShell({
  children,
  title = "Now Playing",
  showBack = true,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030005] text-white">
      <BackgroundGlow />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="relative z-10 mx-auto min-h-screen max-w-[1600px] flex flex-col">
        <TopBar
          title={title}
          showBack={showBack}
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
        />

        <div className="flex-1 flex flex-col min-h-0 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}