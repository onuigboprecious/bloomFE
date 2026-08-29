import { apiClient } from './client';

export async function getAnalyticsApi() {
  return apiClient('/api/analytics', {
    method: 'GET',
  });
}

export async function recordTapApi({ cardUid, deviceOs = 'iOS', location = 'Lagos, Nigeria' }) {
  return apiClient('/api/analytics/tap', {
    method: 'POST',
    body: JSON.stringify({ cardUid, deviceOs, location }),
  });
}
