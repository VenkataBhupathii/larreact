
<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Http\Requests\ProjectRequest;
use App\Services\ProjectService;

class ProjectController extends Controller
{
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index()
    {
        $projects = Project::with(['members', 'tasks'])
            ->where(function($query) {
                $query->where('user_id', auth()->id())
                    ->orWhereHas('members', function($q) {
                        $q->where('user_id', auth()->id());
                    });
            })
            ->get();
            
        return $this->success($projects);
    }

    public function store(ProjectRequest $request)
    {
        $project = $this->projectService->create(
            $request->validated(),
            auth()->id()
        );

        return $this->success($project, 'Project created successfully', 201);
    }

    public function show(Project $project)
    {
        $this->authorize('view', $project);
        $project->load(['members', 'tasks']);
        return $this->success($project);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $this->authorize('update', $project);
        $project = $this->projectService->update($project, $request->validated());
        return $this->success($project, 'Project updated successfully');
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);
        $project->delete();
        return $this->success(null, 'Project deleted successfully', 204);
    }

    public function addMember(Project $project, User $user)
    {
        $this->authorize('update', $project);
        $this->projectService->addMember($project, $user->id);
        return $this->success(null, 'Member added successfully');
    }

    public function removeMember(Project $project, User $user)
    {
        $this->authorize('update', $project);
        $this->projectService->removeMember($project, $user->id);
        return $this->success(null, 'Member removed successfully');
    }
}
