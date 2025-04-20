
import { useState, useEffect, useRef } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { useSocketChat } from '@/hooks/use-socket-chat';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

const Chat = () => {
  const roomId = 'global'; // Default room ID for global chat
  const { messages, isConnected, sendMessage } = useSocketChat(roomId);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return;
    
    setIsSending(true);
    try {
      await sendMessage(content);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <div className="py-4 px-6 border-b">
          <h1 className="text-2xl font-bold">Team Chat</h1>
          <p className="text-muted-foreground">
            {isConnected ? 'Connected to chat server' : 'Connecting to chat server...'}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {isConnected ? 'No messages yet' : (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p>Connecting to chat...</p>
                </div>
              )}
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isOwn={message.sender_id === user?.id}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isDisabled={!isConnected || isSending}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
