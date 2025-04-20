
// Mock data for the application
// This will be replaced with API calls in a production environment

// Users
export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'developer'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    role: 'designer'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'manager'
  }
];

// Current logged in user
export const currentUser = users[0];

// Projects
export const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Redesign the company website with new branding',
    status: 'active',
    progress: 75,
    due_date: '2025-05-15',
    created_at: '2025-01-15',
    user_id: 1,
    members: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Develop a new mobile app for both iOS and Android',
    status: 'active',
    progress: 30,
    due_date: '2025-07-20',
    created_at: '2025-02-10',
    user_id: 1,
    members: [1, 3, 4]
  },
  {
    id: 3,
    name: 'Product Launch Campaign',
    description: 'Plan and execute the marketing campaign for the new product launch',
    status: 'on_hold',
    progress: 15,
    due_date: '2025-06-10',
    created_at: '2025-03-05',
    user_id: 4,
    members: [2, 4]
  },
  {
    id: 4,
    name: 'UI Component Library',
    description: 'Create a reusable UI component library for future projects',
    status: 'completed',
    progress: 100,
    due_date: '2025-04-01',
    created_at: '2025-01-20',
    user_id: 3,
    members: [1, 2, 3]
  }
];

// Tasks
export const tasks = [
  {
    id: 1,
    project_id: 1,
    title: 'Design Homepage Mockup',
    description: 'Create a mockup for the new homepage design',
    status: 'completed',
    priority: 'high',
    assignee_id: 3,
    due_date: '2025-04-28',
    created_at: '2025-04-15'
  },
  {
    id: 2,
    project_id: 1,
    title: 'Implement Responsive Layout',
    description: 'Ensure the website works well on all devices',
    status: 'in_progress',
    priority: 'normal',
    assignee_id: 2,
    due_date: '2025-05-05',
    created_at: '2025-04-16'
  },
  {
    id: 3,
    project_id: 1,
    title: 'Content Migration',
    description: 'Move content from old website to new one',
    status: 'todo',
    priority: 'normal',
    assignee_id: 1,
    due_date: '2025-05-10',
    created_at: '2025-04-17'
  },
  {
    id: 4,
    project_id: 2,
    title: 'API Design',
    description: 'Design the API endpoints for the mobile app',
    status: 'completed',
    priority: 'high',
    assignee_id: 2,
    due_date: '2025-03-01',
    created_at: '2025-02-15'
  },
  {
    id: 5,
    project_id: 2,
    title: 'User Authentication',
    description: 'Implement user login and registration',
    status: 'in_progress',
    priority: 'high',
    assignee_id: 2,
    due_date: '2025-03-15',
    created_at: '2025-03-01'
  },
  {
    id: 6,
    project_id: 2,
    title: 'UI Implementation',
    description: 'Implement the UI screens based on the designs',
    status: 'todo',
    priority: 'normal',
    assignee_id: 3,
    due_date: '2025-04-01',
    created_at: '2025-03-15'
  },
  {
    id: 7,
    project_id: 3,
    title: 'Market Research',
    description: 'Conduct market research to identify target audience',
    status: 'completed',
    priority: 'normal',
    assignee_id: 4,
    due_date: '2025-03-20',
    created_at: '2025-03-10'
  },
  {
    id: 8,
    project_id: 3,
    title: 'Social Media Strategy',
    description: 'Develop a social media strategy for the launch',
    status: 'todo',
    priority: 'high',
    assignee_id: 4,
    due_date: '2025-04-15',
    created_at: '2025-03-25'
  }
];

// Messages
export const messages = [
  {
    id: 1,
    sender_id: 1,
    content: 'Hey team, we need to finalize the homepage design today.',
    room_id: 'project:1',
    created_at: '2025-04-19T09:15:00Z'
  },
  {
    id: 2,
    sender_id: 3,
    content: 'I\'ve uploaded the latest mockups to the shared folder.',
    room_id: 'project:1',
    created_at: '2025-04-19T09:18:00Z'
  },
  {
    id: 3,
    sender_id: 2,
    content: 'Looks good! I\'ll start implementing it right away.',
    room_id: 'project:1',
    created_at: '2025-04-19T09:22:00Z'
  },
  {
    id: 4,
    sender_id: 1,
    content: 'How\'s the API implementation coming along?',
    room_id: 'project:2',
    created_at: '2025-04-19T10:05:00Z'
  },
  {
    id: 5,
    sender_id: 2,
    content: 'Almost done. Just finalizing the authentication endpoints.',
    room_id: 'project:2',
    created_at: '2025-04-19T10:10:00Z'
  },
  {
    id: 6,
    sender_id: 4,
    content: 'We need to schedule a meeting to discuss the marketing strategy.',
    room_id: 'project:3',
    created_at: '2025-04-19T11:30:00Z'
  },
  {
    id: 7,
    sender_id: 1,
    content: 'Can everyone update their task status by the end of the day?',
    room_id: 'global',
    created_at: '2025-04-19T14:00:00Z'
  },
  {
    id: 8,
    sender_id: 3,
    content: 'I\'ll be working late tonight to finish the designs.',
    room_id: 'global',
    created_at: '2025-04-19T15:45:00Z'
  }
];
