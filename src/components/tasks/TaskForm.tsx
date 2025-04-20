
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Loader2, CalendarIcon } from 'lucide-react';
import { useTasks } from '@/hooks/use-tasks';
import { useProjects } from '@/hooks/use-projects';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  projectId?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskForm({ projectId, open, onOpenChange }: TaskFormProps) {
  const { createTask } = useTasks();
  const { projects } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'normal',
      project_id: projectId || '',
      assignee_id: '',
    }
  });

  const watchedProjectId = watch('project_id');

  useEffect(() => {
    if (projectId) {
      setValue('project_id', projectId.toString());
    }
  }, [projectId, setValue]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await createTask({
        ...data,
        project_id: Number(data.project_id),
        assignee_id: data.assignee_id ? Number(data.assignee_id) : undefined,
        due_date: date ? format(date, 'yyyy-MM-dd') : undefined
      });
      reset();
      setDate(undefined);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {!projectId && (
            <div className="space-y-2">
              <label htmlFor="project_id" className="text-sm font-medium">Project</label>
              <Select 
                value={watchedProjectId.toString()} 
                onValueChange={(value) => setValue('project_id', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Projects</SelectLabel>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.project_id && (
                <p className="text-sm text-destructive">{errors.project_id.message}</p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Task Title</label>
            <Input 
              id="title" 
              {...register('title', { required: 'Task title is required' })} 
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea 
              id="description" 
              {...register('description')} 
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select 
                defaultValue="todo" 
                onValueChange={(value) => setValue('status', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">Priority</label>
              <Select 
                defaultValue="normal" 
                onValueChange={(value) => setValue('priority', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="due_date" className="text-sm font-medium">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  disabled={isLoading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !watchedProjectId}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Task'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
