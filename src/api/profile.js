import { apiClient, API_BASE_URL } from './client';

export async function getPublicProfileApi(username) {
  return apiClient(`/api/profile/@${username}`, {
    method: 'GET',
  });
}

export async function getCardTapProfileApi(cardUid, sig = '') {
  const query = sig ? `?sig=${encodeURIComponent(sig)}` : '';
  return apiClient(`/api/profile/${cardUid}${query}`, {
    method: 'GET',
  });
}

export async function updateProfileApi(profileData) {
  return apiClient('/api/profile/me', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}

export async function checkHandleApi(username) {
  return apiClient(`/api/profile/check-handle?username=${encodeURIComponent(username)}`, {
    method: 'GET',
  });
}

export async function claimCardApi(cardUid) {
  return apiClient('/api/cards/claim', {
    method: 'POST',
    body: JSON.stringify({ cardUid }),
  });
}

export function getVCardUrl(username) {
  return `${API_BASE_URL}/api/vcard/@${username}`;
}
