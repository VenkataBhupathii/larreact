
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'project_id',
        'title',
        'description',
        'status',
        'assignee_id',
        'priority',
        'due_date'
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'completed_at' => 'datetime'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }
}
