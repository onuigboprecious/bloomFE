import { apiClient } from './client';

export async function loginApi({ email, password }) {
  return apiClient('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signupApi({ email, password, name, username }) {
  return apiClient('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, username }),
  });
}

export async function logoutApi() {
  return apiClient('/api/auth/logout', {
    method: 'POST',
  });
}

export async function getMeApi() {
  return apiClient('/api/auth/me', {
    method: 'GET',
  });
}

export async function forgotPasswordApi({ email }) {
  return apiClient('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPasswordApi({ token, newPassword }) {
  return apiClient('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}
