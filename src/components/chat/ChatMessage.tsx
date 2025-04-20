
import { format } from 'date-fns';
import { Download, FileText, Image } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
  isOwn?: boolean;
}

export function ChatMessage({ message, isOwn = false }: ChatMessageProps) {
  const messageDate = message.created_at ? new Date(message.created_at) : new Date();
  const formattedTime = format(messageDate, 'h:mm a');
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className={`h-8 w-8 ${isOwn ? 'ml-2' : 'mr-2'}`}>
          <AvatarImage src={message.sender?.avatar} />
          <AvatarFallback>{message.sender ? getInitials(message.sender.name) : '?'}</AvatarFallback>
        </Avatar>
        
        <div>
          <div className={`flex items-center ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <span className="text-sm font-medium">{message.sender?.name || 'Unknown User'}</span>
            <span className="text-xs text-muted-foreground ml-2">{formattedTime}</span>
          </div>
          
          <div 
            className={`mt-1 p-3 rounded-lg ${
              isOwn 
                ? 'bg-primary text-primary-foreground rounded-tr-none' 
                : 'bg-muted rounded-tl-none'
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center gap-2">
                    {attachment.type.startsWith('image/') ? (
                      <a 
                        href={attachment.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block max-w-full"
                      >
                        <img 
                          src={attachment.url} 
                          alt={attachment.name} 
                          className="max-h-[200px] rounded object-cover"
                        />
                      </a>
                    ) : (
                      <div className={`flex items-center p-2 rounded ${isOwn ? 'bg-primary-foreground/10' : 'bg-background'}`}>
                        {getFileIcon(attachment.type)}
                        <span className="ml-2 text-sm max-w-[200px] truncate">{attachment.name}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 ml-2"
                          asChild
                        >
                          <a href={attachment.url} download={attachment.name}>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
