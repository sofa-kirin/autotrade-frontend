import api from './client';

export const adminGetListings = (page = 0, size = 20) =>
  api.get('/listings', { params: { page, size } });

export const adminCreateListing = (data) => api.post('/listings', data);

export const adminUpdateListing = (id, data) => api.put(`/listings/${id}`, data);

export const adminDeleteListing = (id) => api.delete(`/listings/${id}`);

export const adminUpdateStatus = (id, status) =>
  api.patch(`/listings/${id}/status`, null, { params: { status } });
