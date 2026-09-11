import { apiClient, API_BASE_URL } from './client';

export async function getProfileMeApi() {
  return apiClient('/api/profile/me', {
    method: 'GET',
  });
}

export async function updateProfileApi(profileData) {
  return apiClient('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}

export async function getPublicProfileApi(username, sig = '') {
  const query = sig ? `?sig=${encodeURIComponent(sig)}` : '';
  return apiClient(`/api/profile/public/${username}${query}`, {
    method: 'GET',
  });
}

export async function getCardTapProfileApi(cardUid, sig = '') {
  const query = sig ? `?sig=${encodeURIComponent(sig)}` : '';
  return apiClient(`/api/profile/${cardUid}${query}`, {
    method: 'GET',
  });
}

export async function checkHandleApi(username) {
  return apiClient(`/api/profile/check-handle?username=${encodeURIComponent(username)}`, {
    method: 'GET',
  });
}

export async function claimCardApi(cardUid) {
  return apiClient('/api/cards/activate', {
    method: 'POST',
    body: JSON.stringify({ cardUid }),
  });
}

export async function joinWaitlistApi(waitlistData) {
  return apiClient('/api/waitlist', {
    method: 'POST',
    body: JSON.stringify(waitlistData),
  });
}

export function getVCardUrl(username) {
  return `${API_BASE_URL}/api/vcard/@${username}`;
}

export async function uploadImageApi(file, folder = 'avatars') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const token = localStorage.getItem('bloom_token');
  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to upload image');
  }

  return data;
}

