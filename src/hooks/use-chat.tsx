
import { useEffect, useState } from 'react';
import { messageService } from '@/services/api';
import socketService from '@/services/socket';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/types';

export function useChat(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial messages
    messageService.getRoomMessages(roomId)
      .then((response) => {
        setMessages(response.data.data);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load messages",
        });
      });

    // Initialize socket connection
    const token = localStorage.getItem('auth_token');
    if (token) {
      socketService.init(token);
      socketService.joinRoom(roomId);
      setIsConnected(true);

      // Listen for new messages
      socketService.onMessage((data) => {
        if (data.roomId === roomId) {
          setMessages((prev) => [...prev, data.message]);
        }
      });
    }

    return () => {
      if (isConnected) {
        socketService.leaveRoom(roomId);
      }
    };
  }, [roomId]);

  const sendMessage = async (content: string, attachments?: File[]) => {
    try {
      await messageService.send(content, roomId, attachments);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
    }
  };

  return {
    messages,
    isConnected,
    sendMessage
  };
}
