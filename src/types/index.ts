
// Type definitions for our application

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
  status: 'online' | 'offline' | 'away';
  lastActive?: string;
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: Attachment[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  progress: number;
  createdAt: string;
  dueDate?: string;
  members: number[];
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assigneeId?: number;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Attachment {
  id: number;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Notification {
  id: number;
  userId: number;
  type: 'message' | 'task' | 'project' | 'system';
  content: string;
  read: boolean;
  timestamp: string;
  actionLink?: string;
}
