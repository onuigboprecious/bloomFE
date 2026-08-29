import { apiClient } from './client';

export async function getCustomLinksApi() {
  return apiClient('/api/custom-links', {
    method: 'GET',
  });
}

export async function addCustomLinkApi({ label, url, order = 1 }) {
  return apiClient('/api/custom-links', {
    method: 'POST',
    body: JSON.stringify({ label, url, order }),
  });
}

export async function deleteCustomLinkApi(id) {
  return apiClient(`/api/custom-links/${id}`, {
    method: 'DELETE',
  });
}
