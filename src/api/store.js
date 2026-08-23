import { apiClient } from './client';

export async function joinWaitlistApi(waitlistData) {
  return apiClient('/api/waitlist', {
    method: 'POST',
    body: JSON.stringify(waitlistData),
  });
}

export async function createOrderApi(orderData) {
  return apiClient('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}
