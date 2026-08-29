import { apiClient } from './client';

export async function getSocialsApi() {
  return apiClient('/api/socials', {
    method: 'GET',
  });
}

export async function addSocialApi(data) {
  // Can be { platform, handle } or { socials: [...] }
  return apiClient('/api/socials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteSocialApi(id) {
  return apiClient(`/api/socials/${id}`, {
    method: 'DELETE',
  });
}
