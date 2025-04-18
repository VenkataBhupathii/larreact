
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { messages, users, currentUser } from '@/data/mockData';
import { Search, Phone, Video, Info, User as UserIcon } from 'lucide-react';
import { User } from '@/types';

const Chat = () => {
  const [chatMessages, setChatMessages] = useState(messages);
  const [selectedUser, setSelectedUser] = useState<User | null>(users[1]); // Default to the first user that's not current user
  
  const handleSendMessage = (content: string) => {
    // In a real app, this would use sockets to send the message
    const newMessage = {
      id: chatMessages.length + 1,
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setChatMessages([...chatMessages, newMessage]);
    
    // Here we would also emit the message via socket:
    // socket.emit('send_message', { content, recipientId: selectedUser.id });
    console.log("Sending message via socket:", content);
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden border rounded-lg shadow-sm bg-card">
        {/* Left sidebar - Users/Chats list */}
        <div className="w-72 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">Messages</h2>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="syncsaga-input pl-9 w-full"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {users.filter(user => user.id !== currentUser.id).map(user => (
              <div 
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-secondary/50 transition-colors ${
                  selectedUser?.id === user.id ? 'bg-secondary' : ''
                }`}
              >
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full" 
                  />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                    user.status === 'online' ? 'bg-green-500' : 
                    user.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                  }`}></span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.status === 'online' ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - Chat area */}
        {selectedUser ? (
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full" 
                />
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedUser.status === 'online' ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4">
              {chatMessages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            
            {/* Chat input */}
            <ChatInput 
              onSendMessage={handleSendMessage} 
              onAttachFile={() => console.log("File attachment clicked")}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="flex justify-center">
                <UserIcon className="w-10 h-10 text-muted-foreground mb-2" />
              </div>
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a person from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Chat;
