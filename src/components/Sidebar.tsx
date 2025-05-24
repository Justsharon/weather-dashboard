import React from "react";
// import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
// import classnames from "classnames";

interface SidebarProps {
  isOpen: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Sidebar = ({
  children,
  className,
  isOpen,
  ...rest
}: SidebarProps) => {
  return (
    <section
      className={`fixed left-0 top-0 z-50 py-20 flex h-screen min-w-fit flex-col justify-between overflow-auto bg-primaryTheme pb-5 pt-20 hiden md:block dark:bg-gray-900 dark:text-gray-200 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block
        `}
      {...rest}
    >
    
      <nav className="flex w-full flex-1 flex-col gap-6 px-6 mt-8">
        <ul className="text-sm flex w-full flex-1 flex-col gap-6 px-6">
          <li>
            <a href="#"  className="relative flex items-center justify-start gap-1 rounded-lg p-2 text-small-regular text-primary dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700">
              <Icon  icon="material-symbols:dashboard"  height="20" />
              <span className="max-lg:hidden">Dashboard</span>
            </a >
          </li>
          <li>
            <a href="#"  className="relative flex items-center justify-start gap-1 rounded-lg p-2 text-small-regular text-primary dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700">
              <Icon icon="iconoir:maps-arrow"   height="20" />
              <span className="max-lg:hidden">Maps</span>
            </a >
          </li>
          <li>
            <a href="#"  className="relative flex items-center justify-start gap-1 rounded-lg p-2 text-small-regular text-primary dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700">
              <Icon icon="solar:chart-bold"  height="20" />
              <span className="max-lg:hidden">Charts</span>
            </a >
          </li>
          <li>
            <a href="#"  className="relative flex items-center justify-start gap-1 rounded-lg p-2 text-small-regular text-primary dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700">
              <Icon icon="mdi:location"  height="20" />
              <span className="max-lg:hidden">Saved Location</span>
            </a >
          </li>
          <li>
            <a href="#"  className="relative flex items-center justify-start gap-1 rounded-lg p-2 text-small-regular text-primary dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700">
              <Icon icon="material-symbols:air"  height="20" />
              <span className="max-lg:hidden">Air Quality</span>
            </a >
          </li>
        </ul>
      </nav>
      {children && <div className="mt-8 p-4">{children}</div>}
    </section>

  );
};
export default Sidebar;
