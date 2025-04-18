
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status',
        'progress',
        'due_date'
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'progress' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'project_members');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
