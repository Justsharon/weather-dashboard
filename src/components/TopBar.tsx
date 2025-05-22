// import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";

const TopBar = () => {
  //   const navigate = useNavigate();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <nav className="flex items-center space-x-2">
        <Icon
          icon="arcticons:mjweather"
          width="20"
          height="20"
          className="text-[#3f51b5] "
        />
        <p className="font-bold text-xl text-[#3f51b5]">Weather Dashboard</p>
      </nav>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">Logged in</span>
        <button className="bg-[#3f51b5] text-sm text-white px-3 py-1 rounded hover:bg-blue-600">
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar;
