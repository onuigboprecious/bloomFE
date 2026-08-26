import { apiClient } from './client';

export async function provisionCardsApi({ cardUids, finishName = 'Stealth Matte Black' }) {
  return apiClient('/api/admin/cards/provision', {
    method: 'POST',
    body: JSON.stringify({ cardUids, finishName }),
  });
}
