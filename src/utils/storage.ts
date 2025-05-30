import type { FavoriteLocation, TemperatureUnit } from "../types";

const FAVORITES_KEY = 'weaatherapp_favorites';
const UNIT_KEY = 'weather_unit';

export const getFavorites = (): FavoriteLocation[] => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : []
}

export const addFavorite = (location: FavoriteLocation) => {
    const favorites = getFavorites();
    if(!favorites.some(fav => fav.id === location.id)) {
 localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, location]))
    }
}

export const removeFavorite = (id: string) => {
  const favorites = getFavorites();
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites.filter(fav => fav.id !== id))
  );
};

export const getPreferredUnit = (): TemperatureUnit => {
  return (localStorage.getItem(UNIT_KEY) as TemperatureUnit) || 'celsius';
};

export const setPreferredUnit = (unit: TemperatureUnit) => {
  localStorage.setItem(UNIT_KEY, unit);
};