
<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Events\ProjectUpdated;

class ProjectController extends Controller
{
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
            
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'nullable|date',
        ]);

        $project = new Project($validated);
        $project->status = 'active';
        $project->progress = 0;
        $project->user_id = auth()->id();
        $project->save();

        $project->members()->attach(auth()->id());

        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        $this->authorize('view', $project);
        $project->load(['members', 'tasks']);
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'status' => 'sometimes|in:active,completed,archived',
            'progress' => 'sometimes|integer|min:0|max:100',
            'due_date' => 'nullable|date',
        ]);

        $project->update($validated);

        event(new ProjectUpdated($project));

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);
        $project->delete();
        return response()->json(null, 204);
    }

    public function addMember(Request $request, Project $project)
    {
        $this->authorize('update', $project);
        
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $project->members()->attach($validated['user_id']);

        return response()->json(['message' => 'Member added successfully']);
    }

    public function removeMember(Project $project, User $user)
    {
        $this->authorize('update', $project);
        $project->members()->detach($user->id);
        return response()->json(['message' => 'Member removed successfully']);
    }
}
