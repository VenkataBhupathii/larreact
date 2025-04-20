
import { User, Message, Project, Task } from './index';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface MessagesResponse {
  data: Message[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ProjectsResponse {
  data: Project[];
}

export interface TasksResponse {
  data: Task[];
}
