import { apiClient } from './client';

export async function activateCardApi(cardUid) {
  return apiClient('/api/cards/activate', {
    method: 'POST',
    body: JSON.stringify({ cardUid }),
  });
}

export async function getMyCardsApi() {
  return apiClient('/api/cards/me', {
    method: 'GET',
  });
}
