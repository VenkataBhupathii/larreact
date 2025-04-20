
export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  status?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  status?: string;
  progress?: number;
  due_date?: string;
  user_id?: number;
  user?: User;
  members?: User[];
  tasks?: Task[];
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  completed_at?: string;
  project_id: number;
  assignee_id?: number;
  project?: Project;
  assignee?: User;
  created_at?: string;
  updated_at?: string;
}

export interface Message {
  id: number;
  content: string;
  sender_id: number;
  room_id: string;
  sender?: User;
  attachments?: Attachment[];
  created_at?: string;
  updated_at?: string;
}

export interface Attachment {
  id: number;
  name: string;
  url: string;
  type: string;
  size: number;
  message_id: number;
  created_at?: string;
  updated_at?: string;
}
