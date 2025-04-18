
<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::with(['project', 'assignee'])
            ->whereHas('project', function($query) {
                $query->where('user_id', auth()->id())
                    ->orWhereHas('members', function($q) {
                        $q->where('user_id', auth()->id());
                    });
            });

        if ($request->project_id) {
            $query->where('project_id', $request->project_id);
        }

        $tasks = $query->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in-progress,review,completed',
            'assignee_id' => 'nullable|exists:users,id',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        $this->authorize('update', $project);

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task->project);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:todo,in-progress,review,completed',
            'assignee_id' => 'nullable|exists:users,id',
            'priority' => 'sometimes|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        if ($request->status === 'completed' && $task->status !== 'completed') {
            $validated['completed_at'] = now();
        }

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $this->authorize('update', $task->project);
        $task->delete();
        return response()->json(null, 204);
    }
}
