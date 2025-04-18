
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'role',
        'status',
        'last_active'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'last_active' => 'datetime',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function assignedTasks()
    {
        return $this->hasMany(Task::class, 'assignee_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
}
