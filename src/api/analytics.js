import { apiClient } from './client';

export async function getAnalyticsApi(timeframe = '24h') {
  return apiClient(`/api/analytics?timeframe=${encodeURIComponent(timeframe)}`, {
    method: 'GET',
  });
}

export async function recordTapApi(cardUidOrObj, method = 'NFC Tap', deviceOs = 'iOS', location = 'Lagos, Nigeria') {
  let payload = {};
  if (typeof cardUidOrObj === 'object' && cardUidOrObj !== null) {
    payload = cardUidOrObj;
  } else {
    payload = {
      cardUid: cardUidOrObj,
      method,
      deviceOs,
      location,
    };
  }

  return apiClient('/api/taps/record', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
