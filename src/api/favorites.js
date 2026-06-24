import api from './client';

export const getFavorites = () => api.get('/favorites');
export const addFavorite = (listingId) => api.post(`/favorites/${listingId}`);
export const removeFavorite = (listingId) => api.delete(`/favorites/${listingId}`);
