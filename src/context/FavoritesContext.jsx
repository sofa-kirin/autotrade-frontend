import { createContext, useContext, useEffect, useState } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    if (!user) { setFavoriteIds(new Set()); return; }
    getFavorites()
      .then(({ data }) => setFavoriteIds(new Set(data.map((f) => f.listingId))))
      .catch(() => {});
  }, [user]);

  const toggle = async (listingId) => {
    if (favoriteIds.has(listingId)) {
      await removeFavorite(listingId);
      setFavoriteIds((prev) => { const s = new Set(prev); s.delete(listingId); return s; });
    } else {
      await addFavorite(listingId);
      setFavoriteIds((prev) => new Set([...prev, listingId]));
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
