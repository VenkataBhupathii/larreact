
import axios from 'axios';

// This would be the connection to your Laravel API
// Replace with your actual Laravel backend URL
// const API_URL = 'http://localhost:8000/api';
const API_URL = 'http://localhost:8000/';
const API =

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // This enables sending cookies with requests
});

// Add authentication interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Services for Laravel Backend
export const authService = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  getUser: () => api.get('/auth/user'),
};

export const projectService = {
  getAll: () => api.get('/projects'),
  
  getById: (id: number) => api.get(`/projects/${id}`),
  
  create: (data: { name: string; description: string; dueDate?: string }) => 
    api.post('/projects', data),
  
  update: (id: number, data: { name?: string; description?: string; status?: string; dueDate?: string }) => 
    api.put(`/projects/${id}`, data),
  
  delete: (id: number) => api.delete(`/projects/${id}`),
  
  addMember: (projectId: number, userId: number) => 
    api.post(`/projects/${projectId}/members`, { userId }),
  
  removeMember: (projectId: number, userId: number) => 
    api.delete(`/projects/${projectId}/members/${userId}`),
};

export const taskService = {
  getAll: (filters = {}) => api.get('/tasks', { params: filters }),
  
  getById: (id: number) => api.get(`/tasks/${id}`),
  
  create: (data: { 
    projectId: number; 
    title: string; 
    description?: string; 
    status?: string;
    assigneeId?: number;
    priority?: string;
    dueDate?: string;
  }) => api.post('/tasks', data),
  
  update: (id: number, data: {
    title?: string;
    description?: string;
    status?: string;
    assigneeId?: number;
    priority?: string;
    dueDate?: string;
  }) => api.put(`/tasks/${id}`, data),
  
  delete: (id: number) => api.delete(`/tasks/${id}`),
};

export const userService = {
  getAll: () => api.get('/users'),
  
  getById: (id: number) => api.get(`/users/${id}`),
  
  update: (id: number, data: {
    name?: string;
    email?: string;
    role?: string;
    status?: string;
  }) => api.put(`/users/${id}`, data),
};

export default api;
