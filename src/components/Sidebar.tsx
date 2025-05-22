import React from "react";
// import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
// import classnames from "classnames";


interface SidebarProps {
  isOpen: boolean;
  toggleSidebar?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Sidebar = ({
  children,
  className,
  isOpen,
  toggleSidebar,
  ...rest
}: SidebarProps) => {
  return (
    <section
      className={`bg-[#3f51b5] h-full w-full text-white p-4 transition-transform duration-300 ease-in-out
         ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block md:translate-x-0 md:relative ${className}`}
      {...rest}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <button onClick={toggleSidebar} className="text-white md:hidden">
         <Icon icon="charm:menu-hamburger" width="24" height="24" />
        </button>
      </div>

      <nav className="mt-8">
        <ul className="text-sm">
          <li>
            <a href="#"  className="flex items-center justify-start py-2 px-4 m-2 hover:bg-white hover:text-[#3f51b5] hover:rounded-md">
            <Icon icon="iconamoon:profile-fill" width="24" height="24" className="mr-2" />
              <span className="ms-3">Dashboard</span>
            </a >
          </li>
          <li>
            <a href="#"  className="flex items-center justify-start py-2 px-4 m-2 hover:bg-white hover:text-[#3f51b5] hover:rounded-md">
            <Icon icon="si:projects-alt-fill" width="24" height="24" className="mr-2" />
             <span className="ms-3">Maps</span>
            </a >
          </li>
          <li>
            <a href="#"  className="flex items-center justify-start py-2 px-4 m-2 hover:bg-white hover:text-[#3f51b5] hover:rounded-md">
              <Icon icon="fa-solid:file-invoice-dollar" width="24" height="24" className="mr-2" />
              <span className="ms-3">Charts</span>
            </a >
          </li>
          <li>
            <a href="#"  className="flex items-center justify-start py-2 px-4 m-2 hover:bg-white hover:text-[#3f51b5] hover:rounded-md">
            <Icon icon="material-symbols:chat-rounded" width="24" height="24" className="mr-2" />
              <span className="ms-3">Saved Location</span>
            </a >
          </li>
          <li>
            <a href="#"  className="flex items-center justify-start py-2 px-4 m-2 hover:bg-white hover:text-[#3f51b5] hover:rounded-md">
            <Icon icon="material-symbols:chat-rounded" width="24" height="24" className="mr-2" />
              <span className="ms-3">Air Quality</span>
            </a >
          </li>
        </ul>
      </nav>
      {children && <div className="mt-8 p-4">{children}</div>}
    </section>

  );
};
export default Sidebar;
