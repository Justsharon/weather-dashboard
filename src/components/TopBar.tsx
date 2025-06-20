import { Icon } from "@iconify/react";
import Hamburger from "./Hamburger";

interface TopbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopbarProps> = ({isSidebarOpen, toggleSidebar}) => {
  return (
    <header className="bg-white shadow p-4 flex justify-end items-center">
      <nav className="flex items-end space-x-2">
        <Icon
          icon="arcticons:mjweather"
          height="24"
          className="text-gray-900"
        />
        <p className="hidden md:block font-bold text-xl text-gray-900">Weather Dashboard</p>
        <Hamburger isOpen={isSidebarOpen} onClick={toggleSidebar} />
      </nav>
      {/* <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">Logged in</span>
        <button className="bg-gray-900 text-sm text-white px-3 py-1 rounded hover:bg-blue-600">
          Logout
        </button>
      </div> */}
    </header>
  );
};

export default TopBar;
