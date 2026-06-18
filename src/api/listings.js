import api from './client';

export const getListings = (page = 0, size = 10) =>
  api.get('/listings', { params: { page, size } });

export const getListingById = (id) => api.get(`/listings/${id}`);

export const createListing = (data) => api.post('/listings', data);

export const updateListing = (id, data) => api.put(`/listings/${id}`, data);

export const deleteListing = (id) => api.delete(`/listings/${id}`);
