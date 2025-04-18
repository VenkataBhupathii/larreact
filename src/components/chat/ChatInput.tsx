
import { useState } from 'react';
import { Paperclip, Send, Smile } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onAttachFile?: () => void;
}

export function ChatInput({ onSendMessage, onAttachFile }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-background p-4">
      <div className="relative flex items-center">
        <button
          type="button"
          className="absolute left-3 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onAttachFile}
        >
          <Paperclip className="h-5 w-5" />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="syncsaga-input pl-10 pr-10 w-full py-2"
        />
        
        <button
          type="button"
          className="absolute right-10 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Smile className="h-5 w-5" />
        </button>
        
        <button
          type="submit"
          disabled={!message.trim()}
          className="absolute right-3 text-primary hover:text-primary/80 transition-colors disabled:text-muted-foreground disabled:hover:text-muted-foreground"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
