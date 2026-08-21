const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bloombe.onrender.com';

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

export async function loginApi({ email, password }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signupApi({ email, password, name }) {
  return request('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
}

export async function logoutApi() {
  return request('/api/auth/logout', {
    method: 'POST',
  });
}

export async function getMeApi() {
  return request('/api/auth/me', {
    method: 'GET',
  });
}
