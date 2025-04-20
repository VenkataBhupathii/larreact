
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import type { Task } from '@/types';

interface CreateTaskParams {
  projectId: number;
  title: string;
  description?: string;
  status?: string;
  assigneeId?: number;
  priority?: string;
  dueDate?: string;
}

interface UpdateTaskParams {
  id: number;
  data: {
    title?: string;
    description?: string;
    status?: string;
    assigneeId?: number;
    priority?: string;
    dueDate?: string;
  };
}

export function useTasks(projectId?: number) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const queryKey = projectId ? ['tasks', projectId] : ['tasks'];
  
  const { data: tasks = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await taskService.getAll(projectId ? { project_id: projectId } : {});
      return response.data.data || [];
    }
  });

  const createTaskMutation = useMutation({
    mutationFn: async (taskData: CreateTaskParams) => {
      const response = await taskService.create(taskData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: "Success",
        description: "Task created successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to create task",
      });
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }: UpdateTaskParams) => {
      const response = await taskService.update(id, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: "Success",
        description: "Task updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to update task",
      });
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => {
      await taskService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to delete task",
      });
    }
  });

  return {
    tasks,
    isLoading,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
}
