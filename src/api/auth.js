import { apiClient } from './client';

export async function registerApi({ name, email, password, username }) {
  return apiClient('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, username }),
  });
}

export async function signupApi({ name, email, password, username }) {
  return registerApi({ name, email, password, username });
}

export async function loginApi({ email, password }) {
  return apiClient('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
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
