import { Icon } from "@iconify/react";
import Hamburger from "./Hamburger";

interface TopbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopbarProps> = ({isSidebarOpen, toggleSidebar}) => {
  return (
    <header className="bg-white shadow p-4 flex justify-end items-center">
      <nav className="flex items-center space-x-2">
        <Icon
          icon="arcticons:mjweather"
          height="24"
          className="text-gray-900"
        />
        <p className="hidden md:block font-bold text-xl text-gray-900">Weather Dashboard</p>
        <Hamburger isOpen={isSidebarOpen} onClick={toggleSidebar} />
      </nav>
    </header>
  );
};

export default TopBar;
