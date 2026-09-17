import { apiClient } from './client';

export async function createOrderApi(orderData) {
  return apiClient('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

