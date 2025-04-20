
<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

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
        return $this->success($tasks);
    }

    public function store(TaskRequest $request)
    {
        $task = $this->taskService->create($request->validated());
        return $this->success($task, 'Task created successfully', 201);
    }

    public function update(TaskRequest $request, Task $task)
    {
        $this->authorize('update', $task->project);
        $task = $this->taskService->update($task, $request->validated());
        return $this->success($task, 'Task updated successfully');
    }

    public function destroy(Task $task)
    {
        $this->authorize('update', $task->project);
        $task->delete();
        return $this->success(null, 'Task deleted successfully', 204);
    }
}
