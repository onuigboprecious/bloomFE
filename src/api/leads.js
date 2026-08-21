const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || data.error || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function createLeadApi(leadData) {
  return request('/api/leads', {
    method: 'POST',
    body: JSON.stringify(leadData),
  });
}

export async function getLeadsApi() {
  return request('/api/leads', {
    method: 'GET',
  });
}
