import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router";

interface SidebarProps {
  isOpen: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Sidebar = ({ children, isOpen, ...rest }: SidebarProps) => {
  return (
    <section
  className={`fixed left-0 top-0 bottom-0 z-50 flex min-w-fit flex-col justify-between bg-slate-800 transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:relative md:translate-x-0 md:block
    h-screen overflow-y-auto
  `}
  {...rest}
>

      <nav className="flex w-full flex-1 flex-col gap-6 px-6 mt-8">
        <NavLink
          to="/"
          className="relative flex items-center justify-start gap-1 rounded-lg p-2 text-small-regular text-primary dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Icon icon="material-symbols:dashboard" height="20" />
          <span className="max-lg:hidden">Dashboard</span>
        </NavLink>


        <NavLink
          to="/charts"
          className="relative flex items-center justify-start gap-1 rounded-lg p-2 text-small-regular text-primary dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Icon icon="solar:chart-bold" height="20" />
          <span className="max-lg:hidden">Charts</span>
        </NavLink>

        <NavLink
          to="saved-location"
          className="relative flex items-center justify-start gap-1 rounded-lg p-2 text-small-regular text-primary dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Icon icon="mdi:location" height="20" />
          <span className="max-lg:hidden">Saved Location</span>
        </NavLink>

        <NavLink
          to="/air-quality"
          className="relative flex items-center justify-start gap-1 rounded-lg p-2 text-small-regular text-primary dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Icon icon="material-symbols:air" height="20" />
          <span className="max-lg:hidden">Air Quality</span>
        </NavLink>
      </nav>
      {children && <div className="mt-8 p-4">{children}</div>}
    </section>
  );
};
export default Sidebar;
