
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { Plus, Filter, Loader2 } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import { Button } from '@/components/ui/button';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useAuth } from '@/hooks/use-auth';

const Projects = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'archived'>('all');
  const { projects, isLoading } = useProjects();
  const { isAuthenticated } = useAuth();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  
  const filteredProjects = statusFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === statusFilter);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and track all your team's projects</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsTaskFormOpen(true)} 
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            New Task
          </Button>
          <ProjectForm />
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <div className="flex items-center rounded-lg border p-1 bg-background">
          <button 
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              statusFilter === 'all' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              statusFilter === 'active' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              statusFilter === 'completed' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'
            }`}
          >
            Completed
          </button>
          <button 
            onClick={() => setStatusFilter('archived')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              statusFilter === 'archived' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'
            }`}
          >
            Archived
          </button>
        </div>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1.5">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>
      
      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-lg p-10 text-center">
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">There are no {statusFilter !== 'all' ? statusFilter : ''} projects available.</p>
          <ProjectForm />
        </div>
      )}
      
      <TaskForm 
        open={isTaskFormOpen} 
        onOpenChange={setIsTaskFormOpen} 
      />
    </MainLayout>
  );
};

export default Projects;
