
import { Message, User } from '@/types';
import { format } from 'date-fns';
import { Paperclip } from 'lucide-react';
import { users, currentUser } from '@/data/mockData';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const sender = users.find(user => user.id === message.senderId) as User;
  const isCurrentUser = message.senderId === currentUser.id;
  const formattedTime = format(new Date(message.timestamp), 'h:mm a');
  const hasAttachments = message.attachments && message.attachments.length > 0;
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex-shrink-0">
          <img
            src={sender.avatar}
            alt={sender.name}
            className="w-8 h-8 rounded-full"
          />
        </div>
        
        <div className={`mx-3 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
          <div className="flex flex-col">
            <div className={`flex items-center ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-1`}>
              <span className="text-sm font-medium">{sender.name}</span>
              <span className="text-xs text-muted-foreground ml-2">{formattedTime}</span>
            </div>
            
            <div className={`rounded-lg px-4 py-2 ${
              isCurrentUser 
                ? 'bg-primary text-primary-foreground animate-in-right' 
                : 'bg-secondary text-secondary-foreground animate-in-left'
            }`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {hasAttachments && (
                <div className="mt-2 flex flex-col gap-2">
                  {message.attachments?.map(attachment => (
                    <div 
                      key={attachment.id}
                      className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${
                        isCurrentUser ? 'bg-primary/90' : 'bg-secondary/80'
                      }`}
                    >
                      <Paperclip className="h-4 w-4" />
                      <span className="truncate">{attachment.name}</span>
                      <span className="text-xs opacity-70">
                        {(attachment.size / 1000000).toFixed(1)} MB
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
