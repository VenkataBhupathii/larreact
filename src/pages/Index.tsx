
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { users, projects, tasks, messages } from '@/data/mockData';
import { CheckSquare, MessageSquare, Users, Code } from 'lucide-react';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';

const Index = () => {
  // Filter active projects
  const activeProjects = projects.filter(project => project.status === 'active');
  
  // Get upcoming/in-progress tasks
  const upcomingTasks = tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);
  
  // Get recent messages
  const recentMessages = [...messages]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);

  const handleSendMessage = (content: string) => {
    console.log("Sending message:", content);
    // In a real app, we would call the socket connection to emit message
    // socket.emit('send_message', { content, roomId: currentRoom });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your SyncSaga workspace</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value={projects.length}
          icon={Code}
          trend="up"
          trendValue="+2 this month"
        />
        <StatCard
          title="Open Tasks"
          value={tasks.filter(task => task.status !== 'completed').length}
          icon={CheckSquare}
          trend="down"
          trendValue="-3 since last week"
        />
        <StatCard
          title="Team Members"
          value={users.length}
          icon={Users}
          trend="neutral"
          trendValue="No change"
        />
        <StatCard
          title="Messages"
          value={messages.length}
          description="4 unread messages"
          icon={MessageSquare}
          trend="up"
          trendValue="+12 since yesterday"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <button className="text-primary hover:text-primary/80 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {activeProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Right Column - Tasks and Chat */}
        <div className="space-y-8">
          {/* Tasks Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {upcomingTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Recent Chat */}
          <div className="syncsaga-card p-0 overflow-hidden">
            <div className="bg-muted p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Messages</h2>
            </div>
            <div className="p-4 max-h-[350px] overflow-y-auto">
              {recentMessages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
