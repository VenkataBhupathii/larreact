import axios from 'axios';

// Connect to Laravel API
const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add authentication interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth services for Laravel endpoints
export const authService = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  getUser: () => api.get('/auth/user'),
};

// Project services
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

// Task services
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

// Message services
export const messageService = {
  getAll: () => api.get('/messages'),
  
  send: (content: string, attachments?: File[]) => {
    const formData = new FormData();
    formData.append('content', content);
    
    if (attachments) {
      attachments.forEach(file => {
        formData.append('attachments[]', file);
      });
    }
    
    return api.post('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;
