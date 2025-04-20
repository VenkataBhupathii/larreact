
// Example Node.js Socket.io Server
// This would be in a separate repository

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:8080/', 'https://yourdomain.com'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Connected users store (in-memory for demo, use Redis in production)
const connectedUsers = new Map();

// Middleware to authenticate socket connections
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error: Token missing'));
    }
    
    // Verify token with Laravel API
    // In production, you might want to use JWT verification locally or use Redis
    const response = await axios.get('http://localhost:8000/api/auth/verify-token', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data.success) {
      socket.user = response.data.user;
      next();
    } else {
      next(new Error('Authentication error: Invalid token'));
    }
  } catch (error) {
    next(new Error('Authentication error: ' + error.message));
  }
});

// Socket connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.id} (${socket.user.name})`);
  
  // Add user to connected users
  connectedUsers.set(socket.user.id, {
    socket_id: socket.id,
    user: socket.user,
    status: 'online',
    last_active: new Date()
  });
  
  // Broadcast user status to others
  socket.broadcast.emit('user_status_change', {
    user_id: socket.user.id,
    status: 'online'
  });
  
  // Join Rooms handler
  socket.on('join_room', (data) => {
    const { roomId } = data;
    socket.join(roomId);
    console.log(`User ${socket.user.id} joined room ${roomId}`);
    
    // Notify other users in the room
    socket.to(roomId).emit('user_joined', {
      userId: socket.user.id,
      userName: socket.user.name
    });
  });
  
  // Leave room handler
  socket.on('leave_room', (data) => {
    const { roomId } = data;
    socket.leave(roomId);
    console.log(`User ${socket.user.id} left room ${roomId}`);
    
    // Notify other users in the room
    socket.to(roomId).emit('user_left', {
      userId: socket.user.id,
      userName: socket.user.name
    });
  });
  
  // Message handler
  socket.on('send_message', async (data) => {
    const { roomId, message } = data;
    
    try {
      // Save message to database through Laravel API
      const response = await axios.post('http://localhost:8000/api/messages', {
        content: message.content,
        room_id: roomId,
        attachments: message.attachments || []
      }, {
        headers: {
          'Authorization': `Bearer ${socket.handshake.auth.token}`
        }
      });
      
      // Get saved message with ID from database
      const savedMessage = response.data;
      
      // Broadcast message to room
      io.to(roomId).emit('message', {
        roomId,
        message: savedMessage
      });
      
    } catch (error) {
      console.error('Error saving message:', error.message);
      // Send error to sender
      socket.emit('error', {
        message: 'Failed to send message',
        error: error.message
      });
    }
  });
  
  // Typing status handler
  socket.on('typing', (data) => {
    const { roomId, isTyping } = data;
    
    socket.to(roomId).emit('typing_status', {
      roomId,
      userId: socket.user.id,
      isTyping
    });
  });
  
  // Notification handler
  socket.on('send_notification', (data) => {
    const { userIds, notification } = data;
    
    // Send notification to specific users if they're online
    userIds.forEach(userId => {
      const userConnection = connectedUsers.get(userId);
      if (userConnection) {
        io.to(userConnection.socket_id).emit('notification', notification);
      }
    });
  });
  
  // Disconnect handler
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.id}`);
    
    // Update user status
    if (connectedUsers.has(socket.user.id)) {
      connectedUsers.delete(socket.user.id);
    }
    
    // Broadcast user status to others
    socket.broadcast.emit('user_status_change', {
      user_id: socket.user.id,
      status: 'offline'
    });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Get online users endpoint (protected with same token auth)
app.get('/online-users', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token with Laravel API
    const response = await axios.get('http://localhost:8000/api/auth/verify-token', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.data.success) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Return list of online users
    const onlineUsers = Array.from(connectedUsers.values()).map(connection => ({
      id: connection.user.id,
      name: connection.user.name,
      status: connection.status,
      last_active: connection.last_active
    }));
    
    res.json(onlineUsers);
    
  } catch (error) {
    console.error('Error in online-users endpoint:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
