
import { io, Socket } from 'socket.io-client';
import { Message } from '@/types';

// Connect to Node.js Socket.io server
const SOCKET_URL = 'http://localhost:3001';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private connected = false;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

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

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected to backend');
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected from backend');
      this.connected = false;
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    this.socket.on('user_status_change', (data) => {
      console.log('User status changed:', data);
    });
  }

  public isConnected(): boolean {
    return this.connected && !!this.socket?.connected;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  public joinRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('join_room', { roomId });
    }
  }

  public leaveRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('leave_room', { roomId });
    }
  }

  public sendMessage(roomId: string, message: Message): void {
    if (this.socket) {
      this.socket.emit('send_message', { roomId, message });
    }
  }

  public sendTypingStatus(roomId: string, isTyping: boolean): void {
    if (this.socket) {
      this.socket.emit('typing', { roomId, isTyping });
    }
  }

  public onMessage(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('message', callback);
    }
  }

  public onTypingStatus(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('typing_status', callback);
    }
  }

  public off(event: string, callback?: (data: any) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

export default SocketService.getInstance();
