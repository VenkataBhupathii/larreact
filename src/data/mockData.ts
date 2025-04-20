
import { User, Project, Task, Message, Attachment } from '@/types';

// Mock Users
export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    status: 'active',
    avatar: '/assets/avatars/avatar-1.png',
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-04-01T14:30:00Z'
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    role: 'Designer',
    status: 'active',
    avatar: '/assets/avatars/avatar-2.png',
    created_at: '2025-01-20T11:00:00Z',
    updated_at: '2025-04-02T09:15:00Z'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael@example.com',
    role: 'Project Manager',
    status: 'active',
    avatar: '/assets/avatars/avatar-3.png',
    created_at: '2025-01-10T14:00:00Z',
    updated_at: '2025-04-03T16:45:00Z'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Marketing',
    status: 'active',
    avatar: '/assets/avatars/avatar-4.png',
    created_at: '2025-02-05T09:30:00Z',
    updated_at: '2025-04-04T11:20:00Z'
  }
];

export const currentUser = users[0];

// Mock Projects
export const projects: Project[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website',
    status: 'active',
    progress: 65,
    due_date: '2025-05-15',
    user_id: 1,
    members: [users[0], users[1], users[2]],
    created_at: '2025-03-01T10:00:00Z',
    updated_at: '2025-04-10T14:30:00Z'
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Building a cross-platform mobile application',
    status: 'active',
    progress: 30,
    due_date: '2025-07-20',
    user_id: 3,
    members: [users[2], users[3], users[0]],
    created_at: '2025-03-15T11:00:00Z',
    updated_at: '2025-04-12T09:15:00Z'
  },
  {
    id: 3,
    name: 'Marketing Campaign',
    description: 'Q2 digital marketing campaign',
    status: 'completed',
    progress: 100,
    due_date: '2025-04-01',
    user_id: 4,
    members: [users[3], users[1]],
    created_at: '2025-02-10T14:00:00Z',
    updated_at: '2025-04-01T16:45:00Z'
  }
];

// Mock Tasks
export const tasks: Task[] = [
  {
    id: 1,
    title: 'Design Homepage',
    description: 'Create wireframes and mockups for the homepage',
    status: 'in_progress',
    priority: 'high',
    due_date: '2025-04-25',
    project_id: 1,
    assignee_id: 2,
    created_at: '2025-03-05T10:00:00Z',
    updated_at: '2025-04-10T14:30:00Z'
  },
  {
    id: 2,
    title: 'Implement Authentication',
    description: 'Set up user authentication and authorization',
    status: 'pending',
    priority: 'medium',
    due_date: '2025-05-02',
    project_id: 1,
    assignee_id: 1,
    created_at: '2025-03-07T11:00:00Z',
    updated_at: '2025-04-12T09:15:00Z'
  },
  {
    id: 3,
    title: 'API Integration',
    description: 'Connect app to backend API services',
    status: 'pending',
    priority: 'high',
    due_date: '2025-06-10',
    project_id: 2,
    assignee_id: 1,
    created_at: '2025-03-20T14:00:00Z',
    updated_at: '2025-04-15T16:45:00Z'
  },
  {
    id: 4,
    title: 'Social Media Content',
    description: 'Prepare content for social media campaign',
    status: 'completed',
    priority: 'medium',
    due_date: '2025-03-25',
    completed_at: '2025-03-23T12:30:00Z',
    project_id: 3,
    assignee_id: 4,
    created_at: '2025-02-15T09:30:00Z',
    updated_at: '2025-03-23T12:30:00Z'
  },
  {
    id: 5,
    title: 'Performance Testing',
    description: 'Conduct load and stress testing on the application',
    status: 'pending',
    priority: 'low',
    due_date: '2025-06-28',
    project_id: 2,
    assignee_id: 3,
    created_at: '2025-03-25T15:45:00Z',
    updated_at: '2025-04-16T10:20:00Z'
  }
];

// Mock Attachments
export const attachments: Attachment[] = [
  {
    id: 1,
    name: 'homepage-design.png',
    url: '/assets/attachments/homepage-design.png',
    type: 'image/png',
    size: 2500000,
    message_id: 2,
    created_at: '2025-04-15T10:30:00Z'
  }
];

// Mock Messages
export const messages: Message[] = [
  {
    id: 1,
    content: 'Hey team, I just pushed the latest changes to the repository!',
    sender_id: 1,
    room_id: 'project:1',
    created_at: '2025-04-19T09:30:00Z'
  },
  {
    id: 2,
    content: 'Great! I'll review your code this afternoon.',
    sender_id: 3,
    room_id: 'project:1',
    created_at: '2025-04-19T09:45:00Z'
  },
  {
    id: 3,
    content: 'Can someone help me with the authentication module?',
    sender_id: 2,
    room_id: 'project:1',
    created_at: '2025-04-19T10:15:00Z'
  }
];
