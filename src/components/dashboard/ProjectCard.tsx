
import { Project, User } from '@/types';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { users } from '@/data/mockData';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const teamMembers: User[] = users.filter(user => project.members.includes(user.id));
  const formattedDate = project.dueDate 
    ? format(new Date(project.dueDate), 'MMM dd, yyyy')
    : 'No due date';

  return (
    <div className="syncsaga-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
        </div>
        <div className="flex items-center">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              project.status === 'active'
                ? 'bg-green-100 text-green-800'
                : project.status === 'completed'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="w-full bg-secondary rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-right mt-1">{project.progress}% complete</p>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Due: {formattedDate}</span>
        </div>

        <div className="flex -space-x-2">
          {teamMembers.slice(0, 3).map((member) => (
            <img
              key={member.id}
              className="w-7 h-7 rounded-full border-2 border-background"
              src={member.avatar}
              alt={member.name}
              title={member.name}
            />
          ))}
          {teamMembers.length > 3 && (
            <div className="w-7 h-7 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
              <span className="text-xs font-medium">+{teamMembers.length - 3}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
