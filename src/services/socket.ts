
import { io, Socket } from 'socket.io-client';

// This would connect to your Node.js Socket.io server
// Replace with your actual socket server URL
const SOCKET_URL = 'http://localhost:3000';

// Singleton pattern for socket connection
class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private connected = false;

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  // Initialize socket connection with auth token
  public init(token: string): void {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(SOCKET_URL, {
      auth: {
        token
      },
      transports: ['websocket'],
      autoConnect: true
    });

    // Setup event listeners
    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connected = false;
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  // Check if socket is connected
  public isConnected(): boolean {
    return this.connected && !!this.socket?.connected;
  }

  // Close the connection
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  // Join a room (like a chat channel or project room)
  public joinRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('join_room', { roomId });
    }
  }

  // Leave a room
  public leaveRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('leave_room', { roomId });
    }
  }

  // Send a message to a specific room
  public sendMessage(roomId: string, message: any): void {
    if (this.socket) {
      this.socket.emit('send_message', { roomId, message });
    }
  }

  // Send a notification to specific users
  public sendNotification(userIds: number[], notification: any): void {
    if (this.socket) {
      this.socket.emit('send_notification', { userIds, notification });
    }
  }

  // Send typing indicator
  public sendTypingStatus(roomId: string, isTyping: boolean): void {
    if (this.socket) {
      this.socket.emit('typing', { roomId, isTyping });
    }
  }

  // Listen for incoming messages
  public onMessage(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('message', callback);
    }
  }

  // Listen for user status changes (online/offline)
  public onUserStatusChange(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('user_status_change', callback);
    }
  }

  // Listen for notifications
  public onNotification(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('notification', callback);
    }
  }

  // Listen for typing indicators
  public onTypingStatus(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('typing_status', callback);
    }
  }

  // Remove a specific event listener
  public off(event: string, callback?: (data: any) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

// Export as singleton
export default SocketService.getInstance();
