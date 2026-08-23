import { apiClient } from './client';

export async function createLeadApi(leadData) {
  return apiClient('/api/leads', {
    method: 'POST',
    body: JSON.stringify(leadData),
  });
}

export async function getLeadsApi() {
  return apiClient('/api/leads', {
    method: 'GET',
  });
}

export async function deleteLeadApi(leadId) {
  return apiClient(`/api/leads/${leadId}`, {
    method: 'DELETE',
  });
}
