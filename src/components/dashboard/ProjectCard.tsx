
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { useProjects } from '@/hooks/use-projects';
import { useToast } from '@/hooks/use-toast';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { deleteProject } = useProjects();
  const { toast } = useToast();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-yellow-500';
    }
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(project.id);
    }
  };
  
  const handleEdit = () => {
    toast({
      title: "Feature coming soon",
      description: "Project editing will be available in a future update.",
    });
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <CardDescription className="line-clamp-1">
              {project.description || 'No description provided'}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mt-2 mb-1">
          <div className="flex items-center">
            <span className="text-sm font-medium">Progress:</span>
            <span className="ml-1 text-sm">{project.progress || 0}%</span>
          </div>
          <Badge 
            variant="secondary"
            className={`${getStatusColor(project.status || 'active')} text-white`}
          >
            {project.status ? project.status.charAt(0).toUpperCase() + project.status.slice(1) : 'Active'}
          </Badge>
        </div>
        <Progress value={project.progress || 0} className="h-2" />
        
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Tasks</span>
            <span className="text-sm font-medium">{project.tasks?.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Team Members</span>
            <span className="text-sm font-medium">{project.members?.length || 0}</span>
          </div>
          {project.due_date && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Due Date</span>
              <span className="text-sm font-medium">
                {format(new Date(project.due_date), 'MMM d, yyyy')}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => setIsTaskFormOpen(true)}
        >
          <Plus className="mr-2 h-3.5 w-3.5" />
          Add Task
        </Button>
      </CardFooter>
      
      <TaskForm 
        projectId={project.id} 
        open={isTaskFormOpen} 
        onOpenChange={setIsTaskFormOpen} 
      />
    </Card>
  );
}
