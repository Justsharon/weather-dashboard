
import FavoriteList from '../components/FavoriteList';
import { useFavorites } from '../hooks/useFavorites';
import { getWeather } from '../service/weatherAPI';

const Favorites = () => {
  const { favorites, remove } = useFavorites();

  const handleSelect = (location: { name: string }) => {
    getWeather(location.name).catch(console.error);
  };

  return (
    <FavoriteList
      favorites={favorites}
      onSelect={handleSelect}
      onRemove={remove}
    />
  );
};

export default Favorites;
