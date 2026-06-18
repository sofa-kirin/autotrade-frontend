import api from './client';

export const createInquiry = (listingId, data) =>
  api.post(`/listings/${listingId}/inquiries`, data);
