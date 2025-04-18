
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { projects } from '@/data/mockData';
import { Plus, Filter } from 'lucide-react';
import { useState } from 'react';

const Projects = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'archived'>('all');
  
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
        
        <button className="syncsaga-button flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </button>
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
        
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border hover:bg-secondary text-foreground">
          <Filter className="h-4 w-4" />
          More Filters
        </button>
      </div>
      
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-lg p-10 text-center">
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">There are no {statusFilter !== 'all' ? statusFilter : ''} projects available.</p>
          <button className="syncsaga-button">
            Create New Project
          </button>
        </div>
      )}
    </MainLayout>
  );
};

export default Projects;
