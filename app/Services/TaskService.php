
<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function create(array $data)
    {
        return Task::create($data);
    }

    public function update(Task $task, array $data)
    {
        if (isset($data['status']) && $data['status'] === 'completed' && $task->status !== 'completed') {
            $data['completed_at'] = now();
        }
        
        $task->update($data);
        return $task;
    }
}
