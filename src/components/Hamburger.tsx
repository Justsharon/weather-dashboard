
import React from "react";
import { Icon } from "@iconify/react";

interface HamburgerProps {
    onClick: ()=> void;
    isOpen: boolean;
    className?: string;
    fixed?: boolean;
}

const Harmburger: React.FC<HamburgerProps> = ({ onClick, isOpen, className ="", fixed=false }) => {
    return (
        <button
            onClick={onClick}
            className={`md:hidden p-4 rounded-full z-50 focus:outline-none transition-transform duration-300 ${fixed ? "fixed top-4 left-4" : ""} ${className}`}
            aria-label="Toggle menu"
        >
            <Icon
                icon={isOpen ? "charm:cross" : "charm:menu-hamburger"}
                className="text-gray-800"
                width={20}
                height={20}
            />
        </button>
    )
}

export default Harmburger