
# SyncSaga: Real-Time Collaboration Platform

A modern, full-stack collaboration platform built with React, Laravel (PHP), and Node.js with Socket.io.

## Project Architecture

This project demonstrates a full-stack application with the following components:

### 1. Frontend (React + TypeScript)
- Modern React with TypeScript for type safety
- UI built with Tailwind CSS for responsive design
- React Router for client-side routing
- React Query for data fetching and state management

### 2. Backend API (Laravel)
- RESTful API built with Laravel PHP framework
- Authentication with Laravel Sanctum
- Database operations for projects, tasks, users, and messages
- File storage for attachments and media

### 3. Real-time Communication (Node.js + Socket.io)
- Socket.io server for real-time bi-directional communication
- Chat functionality with real-time updates
- Notification system
- User presence tracking (online/offline status)
- Typing indicators

## Project Structure

```
├── src/
│   ├── components/        # UI Components
│   │   ├── chat/          # Chat related components
│   │   ├── dashboard/     # Dashboard related components
│   │   ├── layout/        # Layout components (Sidebar, Header)
│   │   └── ui/            # Base UI components 
│   │
│   ├── data/              # Mock data (replace with API in production)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API and Socket services
│   ├── types/             # TypeScript type definitions
│   └── lib/               # Utility functions
│
├── public/                # Static assets
└── ...
```

## Setup Instructions

### Frontend (React)
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server

### Backend (Laravel)
1. Clone the Laravel backend repository (separate repository)
2. Run `composer install` to install dependencies
3. Configure your `.env` file with database settings
4. Run migrations with `php artisan migrate`
5. Seed the database with `php artisan db:seed`
6. Start the server with `php artisan serve`

### Socket.io Server (Node.js)
1. Clone the socket server repository (separate repository)
2. Run `npm install` to install dependencies
3. Configure environment variables
4. Run `npm start` to start the socket server

## Integration Points

### React Frontend ↔️ Laravel Backend
- Authentication (login, register, logout)
- CRUD operations for projects, tasks, users
- File uploads for attachments

### React Frontend ↔️ Node.js Socket Server
- Real-time chat functionality
- Notifications
- User presence (online status)
- Typing indicators

### Laravel Backend ↔️ Node.js Socket Server
- Event broadcasting
- User authentication verification
- Persistent storage of messages

## Laravel Backend Structure (Reference)

A typical Laravel backend for this application would include:

```
├── app/
│   ├── Http/
│   │   ├── Controllers/    # API controllers
│   │   └── Middleware/     # Auth middleware
│   │
│   ├── Models/             # Eloquent models
│   └── Events/             # Events for socket integration
│
├── database/
│   ├── migrations/         # Database schema
│   └── seeders/           # Sample data
│
├── routes/
│   └── api.php            # API routes
│
└── ...
```

## Node.js Socket Server Structure (Reference)

A typical Node.js socket server would include:

```
├── src/
│   ├── server.js          # Main server setup
│   ├── socket/            # Socket event handlers
│   ├── middleware/        # Auth middleware
│   └── utils/             # Utility functions
│
└── ...
```

## Development Workflow

1. **Design System**: UI components and layouts in React
2. **API Development**: Create API endpoints in Laravel
3. **Socket Integration**: Implement real-time features with Socket.io
4. **Integration**: Connect frontend with backend and socket server

## License

This project is open-source under the MIT license.

## Contributors

- [Your Name] - Initial work
