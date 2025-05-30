import React from "react";
import type { FavoriteLocation } from "../types";
import { Icon } from "@iconify/react/dist/iconify.js";

interface FavoriteListProps {
    favorites: FavoriteLocation[];
    onSelect: (location: FavoriteLocation) => void;
    onRemove: (id: string) => void;
}

export default function FavoriteList ({
    favorites, onSelect, onRemove
}: FavoriteListProps) {
    if (favorites.length === 0) {
        return null
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-xl font-bold mb-4">Favorite Locations</h2>
            <div className="grid grid-cols-2 gap-2">
                {favorites.map((location) => (
                    <div
                        key={location.id}
                        className="group flex items-center gap-1 bg-white rounded-full px-3"
                    >
                        <button
                            onClick={() => onSelect(location)}
                            className="text-gray-700 hover:text-gray-900"
                        >
                            {location.name}
                        </button>
                        <button
                            onClick={() => onRemove(location.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
                        >
                            <Icon icon="material-symbols:close-rounded" className="text-red-600" width="20" height="20" />
                        </button>
                    </div>
                ))}

            </div>
        </div>
    )
}