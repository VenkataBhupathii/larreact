
<?php

namespace App\Services;

use App\Models\Project;
use App\Events\ProjectUpdated;

class ProjectService
{
    public function create(array $data, $userId)
    {
        $project = new Project($data);
        $project->user_id = $userId;
        $project->status = 'active';
        $project->progress = 0;
        $project->save();

        $project->members()->attach($userId);

        return $project;
    }

    public function update(Project $project, array $data)
    {
        $project->update($data);
        event(new ProjectUpdated($project));
        return $project;
    }

    public function addMember(Project $project, $userId)
    {
        if (!$project->members()->where('user_id', $userId)->exists()) {
            $project->members()->attach($userId);
        }
    }

    public function removeMember(Project $project, $userId)
    {
        $project->members()->detach($userId);
    }
}
