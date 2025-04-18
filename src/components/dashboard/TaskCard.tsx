
import { Task } from '@/types';
import { CheckCircle, Clock, Circle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { users } from '@/data/mockData';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const assignee = task.assigneeId ? users.find(user => user.id === task.assigneeId) : null;
  const dueDateObj = task.dueDate ? new Date(task.dueDate) : null;
  const isPastDue = dueDateObj && dueDateObj < new Date() && task.status !== 'completed';
  
  return (
    <div className="flex items-start p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="mr-3 mt-0.5">
        {task.status === 'completed' ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : task.status === 'in-progress' ? (
          <Clock className="h-5 w-5 text-amber-500" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-base">{task.title}</h4>
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            task.priority === 'high' ? 'bg-red-100 text-red-800' :
            task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
            'bg-green-100 text-green-800'
          }`}>
            {task.priority}
          </div>
        </div>
        
        {task.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
        )}
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
          {assignee && (
            <div className="flex items-center gap-1.5">
              <img src={assignee.avatar} alt={assignee.name} className="w-5 h-5 rounded-full" />
              <span className="text-xs">{assignee.name}</span>
            </div>
          )}
          
          {dueDateObj && (
            <div className="flex items-center gap-1.5">
              {isPastDue ? (
                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
              ) : (
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <span className={`text-xs ${isPastDue ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                {format(dueDateObj, 'MMM dd')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
