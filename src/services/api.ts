
import axios from 'axios';
import type { AuthResponse, ApiResponse, MessagesResponse, ProjectsResponse, TasksResponse } from '@/types/api';

// Connect to Laravel API
const api = axios.create({
  baseURL: '/api', // Using Vite's proxy
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
    api.post<AuthResponse>('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    api.post<AuthResponse>('/auth/register', { name, email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  getUser: () => api.get<ApiResponse<User>>('/auth/user'),
  
  verifyToken: () => api.get<ApiResponse>('/auth/verify-token'),
};

// Message services
export const messageService = {
  getAll: () => api.get<MessagesResponse>('/messages'),
  
  getRoomMessages: (roomId: string) => api.get<MessagesResponse>(`/messages/room/${roomId}`),
  
  send: (content: string, roomId: string, attachments?: File[]) => {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('room_id', roomId);
    
    if (attachments) {
      attachments.forEach(file => {
        formData.append('attachments[]', file);
      });
    }
    
    return api.post<ApiResponse<Message>>('/messages', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  delete: (messageId: number) => api.delete(`/messages/${messageId}`),
};

// Project services
export const projectService = {
  getAll: () => api.get<ProjectsResponse>('/projects'),
  
  getById: (id: number) => api.get<ApiResponse<Project>>(`/projects/${id}`),
  
  create: (data: { name: string; description: string; }) => 
    api.post<ApiResponse<Project>>('/projects', data),
  
  update: (id: number, data: { name?: string; description?: string; status?: string; }) => 
    api.put<ApiResponse<Project>>(`/projects/${id}`, data),
  
  delete: (id: number) => api.delete(`/projects/${id}`),
  
  addMember: (projectId: number, userId: number) => 
    api.post<ApiResponse>(`/projects/${projectId}/members`, { userId }),
  
  removeMember: (projectId: number, userId: number) => 
    api.delete(`/projects/${projectId}/members/${userId}`),
};

// Task services
export const taskService = {
  getAll: (filters = {}) => api.get<TasksResponse>('/tasks', { params: filters }),
  
  getById: (id: number) => api.get<ApiResponse<Task>>(`/tasks/${id}`),
  
  create: (data: {
    projectId: number;
    title: string;
    description?: string;
    status?: string;
    assigneeId?: number;
    priority?: string;
    dueDate?: string;
  }) => api.post<ApiResponse<Task>>('/tasks', data),
  
  update: (id: number, data: {
    title?: string;
    description?: string;
    status?: string;
    assigneeId?: number;
    priority?: string;
    dueDate?: string;
  }) => api.put<ApiResponse<Task>>(`/tasks/${id}`, data),
  
  delete: (id: number) => api.delete(`/tasks/${id}`),
};

export default api;
