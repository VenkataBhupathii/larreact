
import { User, Project, Task, Message, Notification } from '@/types';

// Mock Users
export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=8B5CF6&color=fff',
    role: 'admin',
    status: 'online',
    lastActive: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=8B5CF6&color=fff',
    role: 'member',
    status: 'online',
    lastActive: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=8B5CF6&color=fff',
    role: 'member',
    status: 'offline',
    lastActive: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=8B5CF6&color=fff',
    role: 'member',
    status: 'away',
    lastActive: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
  }
];

// Mock Projects
export const projects: Project[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Redesign company website with modern UI/UX principles',
    status: 'active',
    progress: 75,
    createdAt: new Date(Date.now() - 30 * 24 * 3600000).toISOString(), // 30 days ago
    dueDate: new Date(Date.now() + 15 * 24 * 3600000).toISOString(), // 15 days from now
    members: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Develop native mobile applications for iOS and Android',
    status: 'active',
    progress: 40,
    createdAt: new Date(Date.now() - 45 * 24 * 3600000).toISOString(), // 45 days ago
    dueDate: new Date(Date.now() + 60 * 24 * 3600000).toISOString(), // 60 days from now
    members: [1, 2, 4]
  },
  {
    id: 3,
    name: 'Database Migration',
    description: 'Migrate from SQL to NoSQL database architecture',
    status: 'completed',
    progress: 100,
    createdAt: new Date(Date.now() - 90 * 24 * 3600000).toISOString(), // 90 days ago
    dueDate: new Date(Date.now() - 10 * 24 * 3600000).toISOString(), // 10 days ago
    members: [1, 3]
  }
];

// Mock Tasks
export const tasks: Task[] = [
  {
    id: 1,
    projectId: 1,
    title: 'Design Homepage Mockup',
    description: 'Create wireframes and design mockups for the new homepage',
    status: 'completed',
    assigneeId: 2,
    priority: 'high',
    dueDate: new Date(Date.now() - 5 * 24 * 3600000).toISOString(), // 5 days ago
    createdAt: new Date(Date.now() - 25 * 24 * 3600000).toISOString(), // 25 days ago
    completedAt: new Date(Date.now() - 6 * 24 * 3600000).toISOString() // 6 days ago
  },
  {
    id: 2,
    projectId: 1,
    title: 'Implement Frontend Components',
    description: 'Build reusable React components based on the design system',
    status: 'in-progress',
    assigneeId: 1,
    priority: 'medium',
    dueDate: new Date(Date.now() + 5 * 24 * 3600000).toISOString(), // 5 days from now
    createdAt: new Date(Date.now() - 20 * 24 * 3600000).toISOString() // 20 days ago
  },
  {
    id: 3,
    projectId: 1,
    title: 'Optimize Website Performance',
    description: 'Improve load times and optimize assets',
    status: 'todo',
    assigneeId: 3,
    priority: 'medium',
    dueDate: new Date(Date.now() + 10 * 24 * 3600000).toISOString(), // 10 days from now
    createdAt: new Date(Date.now() - 15 * 24 * 3600000).toISOString() // 15 days ago
  },
  {
    id: 4,
    projectId: 2,
    title: 'Design User Authentication Flow',
    description: 'Create login, registration, and password recovery screens',
    status: 'completed',
    assigneeId: 2,
    priority: 'high',
    dueDate: new Date(Date.now() - 15 * 24 * 3600000).toISOString(), // 15 days ago
    createdAt: new Date(Date.now() - 40 * 24 * 3600000).toISOString(), // 40 days ago
    completedAt: new Date(Date.now() - 14 * 24 * 3600000).toISOString() // 14 days ago
  },
  {
    id: 5,
    projectId: 2,
    title: 'Implement Push Notifications',
    description: 'Integrate Firebase Cloud Messaging for cross-platform notifications',
    status: 'in-progress',
    assigneeId: 4,
    priority: 'medium',
    dueDate: new Date(Date.now() + 20 * 24 * 3600000).toISOString(), // 20 days from now
    createdAt: new Date(Date.now() - 30 * 24 * 3600000).toISOString() // 30 days ago
  }
];

// Mock Messages
export const messages: Message[] = [
  {
    id: 1,
    senderId: 2,
    content: 'Hi team, I\'ve completed the homepage design. Take a look when you get a chance!',
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
    read: true,
    attachments: [
      {
        id: 1,
        name: 'homepage-mockup.png',
        url: '#',
        type: 'image/png',
        size: 2400000,
        uploadedAt: new Date(Date.now() - 3 * 3600000).toISOString()
      }
    ]
  },
  {
    id: 2,
    senderId: 1,
    content: 'Looks great, Jane! I\'ll start implementing it tomorrow.',
    timestamp: new Date(Date.now() - 2.5 * 3600000).toISOString(), // 2.5 hours ago
    read: true
  },
  {
    id: 3,
    senderId: 3,
    content: 'I need some help with the database queries. Anyone available for a quick call?',
    timestamp: new Date(Date.now() - 1 * 3600000).toISOString(), // 1 hour ago
    read: false
  },
  {
    id: 4,
    senderId: 4,
    content: 'Just pushed the latest changes to the repository. Please review when you can.',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
    read: false
  }
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: 1,
    userId: 1,
    type: 'task',
    content: 'You\'ve been assigned to "Implement Frontend Components"',
    read: true,
    timestamp: new Date(Date.now() - 20 * 24 * 3600000).toISOString(), // 20 days ago
    actionLink: '/tasks/2'
  },
  {
    id: 2,
    userId: 1,
    type: 'message',
    content: 'Jane Smith mentioned you in a message',
    read: true,
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
    actionLink: '/messages'
  },
  {
    id: 3,
    userId: 1,
    type: 'project',
    content: 'Website Redesign project is 75% complete',
    read: false,
    timestamp: new Date(Date.now() - 1 * 24 * 3600000).toISOString(), // 1 day ago
    actionLink: '/projects/1'
  },
  {
    id: 4,
    userId: 1,
    type: 'system',
    content: 'System maintenance scheduled for tonight 10PM-2AM',
    read: false,
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
  }
];

// Current User (simulating logged in user)
export const currentUser = users[0];
