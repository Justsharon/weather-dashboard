import "./App.css";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { Outlet } from "react-router";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />
      <section className="flex flex-col flex-1 h-full overflow-hidden">
        <div className="h-16 w-full shrink-0  bg-white">
          <TopBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid h-full w-full grid-cols-12 grid-rows-12">
            <div className="col-span-12 row-span-full flex justify-center items-center">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
