import { apiClient } from './client';

export async function recordTapApi(cardUid, method = 'NFC Tap') {
  return apiClient('/api/taps/record', {
    method: 'POST',
    body: JSON.stringify({ cardUid, method }),
  });
}

export async function getAnalyticsApi() {
  return apiClient('/api/analytics', {
    method: 'GET',
  });
}
