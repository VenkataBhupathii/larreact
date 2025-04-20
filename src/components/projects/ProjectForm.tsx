
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import { 
  Select, 
  SelectContent,
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ProjectFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ProjectForm({ open, onOpenChange }: ProjectFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { createProject } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      status: 'active',
      progress: 0,
      due_date: ''
    }
  });

  const watchedStatus = watch('status');

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (onOpenChange) onOpenChange(open);
    if (!open) {
      reset();
      setDate(undefined);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const projectData = {
        ...data,
        progress: parseInt(data.progress),
        due_date: date ? format(date, 'yyyy-MM-dd') : undefined
      };
      
      await createProject(projectData);
      handleOpenChange(false);
      reset();
      setDate(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open !== undefined ? open : isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} id="create-project-form" className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Project Name</label>
            <Input 
              id="name" 
              {...register('name', { required: 'Project name is required' })} 
              disabled={isLoading}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
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
                defaultValue="active" 
                onValueChange={(value) => setValue('status', value)}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="progress" className="text-sm font-medium">Progress (%)</label>
              <Input 
                id="progress" 
                type="number"
                min="0"
                max="100"
                {...register('progress', { 
                  min: { value: 0, message: 'Progress cannot be negative' },
                  max: { value: 100, message: 'Progress cannot exceed 100%' }
                })} 
                disabled={isLoading}
              />
              {errors.progress && (
                <p className="text-sm text-destructive">{errors.progress.message}</p>
              )}
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
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
