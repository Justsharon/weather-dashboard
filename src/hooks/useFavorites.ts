import { useEffect, useState } from "react";
import { addFavorite, getFavorites, removeFavorite } from "../utils/storage";
import type { FavoriteLocation } from "../types";

export function useFavorites() {
    const [favorites, setFavorites ] = useState<FavoriteLocation[]>([]);

    useEffect(() => {
        setFavorites(getFavorites)
    }, [])

     const add = (location: FavoriteLocation) => {
    addFavorite(location);
    setFavorites(getFavorites());
  };

  const remove = (id: string) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };
    const isFavorite = (id: string) => favorites.some(fav => fav.id === id);

  return { favorites, add, remove, isFavorite };
}
