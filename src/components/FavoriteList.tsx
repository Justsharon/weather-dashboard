import type { FavoriteLocation } from "../types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FavoriteListProps {
  favorites: FavoriteLocation[];
  onSelect: (location: FavoriteLocation) => void;
  onRemove: (id: string) => void;
}

export default function FavoriteList({
  favorites,
  onSelect,
  onRemove,
}: FavoriteListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelect = (location: FavoriteLocation) => {
    setActiveId(location.id);
    onSelect(location);
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <Icon icon="ph:map-pin-line-light" width={48} height={48} />
        <p className="mt-2 text-sm">No favorite locations has been added yet.</p>
        <p className="text-xs text-gray-400">
          Add one from the main weather dashboard view
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 rounded-lg shadow-lg p-6 w-full ">
      <h3 className=" font-medium text-gray-800 mb-4">Favorite Locations</h3>
      <div className="grid grid-cols-2 gap-2">
        <AnimatePresence>
          {favorites.map((location) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center justify-between gap-1 bg-gray-50 rounded-full px-3"
            >
              <button
                onClick={() => handleSelect(location)}
                className={`${
                  activeId === location.id
                    ? "font-semibold text-blue-700"
                    : "text-gray-700"
                } hover:text-gray-900`}
              >
                {location.name}
              </button>
              <button
                onClick={() => {
                  if (confirm(`Remove "${location.name}" from favorites?`)) {
                    onRemove(location.id);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
              >
                <Icon
                  icon="material-symbols:close-rounded"
                  className="text-red-600"
                  width="20"
                  height="20"
                />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
