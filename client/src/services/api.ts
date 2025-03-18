const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const api = {
  // Authentication
  register: async (userData: { name: string; email: string; password: string }) => {
    return fetchWithAuth('/user/register-patient', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  login: async (credentials: { email: string; password: string }) => {
    return fetchWithAuth('/user/login-patient', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Protected routes example
  getProfile: async () => {
    return fetchWithAuth('/patients/profile', {
      method: 'GET',
    });
  },
};