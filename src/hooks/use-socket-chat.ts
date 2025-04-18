
import { useState, useEffect, useCallback } from 'react';
import { Message } from '@/types';
import socketService from '@/services/socket';
import { currentUser } from '@/data/mockData';

export function useSocketChat(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Connect to socket when component mounts
  useEffect(() => {
    // In a real app, you'd get the token from authentication
    const token = 'mock-auth-token'; 
    
    try {
      // Initialize socket connection
      socketService.init(token);
      setIsConnected(socketService.isConnected());
      
      // Join the chat room
      socketService.joinRoom(roomId);
      
      // Set up socket listeners
      const handleConnect = () => {
        setIsConnected(true);
        setError(null);
      };
      
      const handleDisconnect = () => {
        setIsConnected(false);
        setError('Disconnected from server');
      };
      
      const handleError = (err: any) => {
        setError(`Socket error: ${err.message || 'Unknown error'}`);
      };
      
      socketService.onMessage((data) => {
        if (data.roomId === roomId) {
          setMessages(prev => [...prev, data.message]);
        }
      });
      
      socketService.onTypingStatus((data) => {
        if (data.roomId === roomId) {
          if (data.isTyping) {
            setTypingUsers(prev => [...prev, data.userId]);
          } else {
            setTypingUsers(prev => prev.filter(id => id !== data.userId));
          }
        }
      });
      
      // Clean up function
      return () => {
        socketService.leaveRoom(roomId);
        socketService.off('message');
        socketService.off('typing_status');
      };
    } catch (err) {
      setError(`Failed to connect: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return () => {};
    }
  }, [roomId]);

  // Send a message
  const sendMessage = useCallback((content: string) => {
    if (!socketService.isConnected()) {
      setError('Not connected to server');
      return false;
    }
    
    try {
      // Construct the message object
      const message: Message = {
        id: Date.now(), // Temporary ID that will be replaced by server
        senderId: currentUser.id,
        content,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      // Send via socket
      socketService.sendMessage(roomId, message);
      
      // Optimistically add to local state
      setMessages(prev => [...prev, message]);
      return true;
    } catch (err) {
      setError(`Failed to send message: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return false;
    }
  }, [roomId]);

  // Set typing status
  const setTyping = useCallback((isTyping: boolean) => {
    if (socketService.isConnected()) {
      socketService.sendTypingStatus(roomId, isTyping);
    }
  }, [roomId]);

  return {
    messages,
    isConnected,
    typingUsers,
    error,
    sendMessage,
    setTyping
  };
}
