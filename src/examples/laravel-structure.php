
<?php
// This is an example of how Laravel backend code would be structured
// Note: This is for demonstration purposes and would be in a separate repository

// Example Route definition (routes/api.php)
Route::prefix('api')->group(function () {
    // Auth routes
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
    
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // Projects
        Route::apiResource('projects', ProjectController::class);
        Route::post('/projects/{project}/members', [ProjectController::class, 'addMember']);
        Route::delete('/projects/{project}/members/{user}', [ProjectController::class, 'removeMember']);
        
        // Tasks
        Route::apiResource('tasks', TaskController::class);
        
        // Users
        Route::apiResource('users', UserController::class)->only(['index', 'show', 'update']);
        
        // Chat
        Route::get('/messages', [MessageController::class, 'index']);
        Route::post('/messages', [MessageController::class, 'store']);
        Route::get('/messages/{user}', [MessageController::class, 'showConversation']);
    });
});

// Example Controller (app/Http/Controllers/ProjectController.php)
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Events\ProjectUpdated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['members', 'tasks'])
            ->where(function ($query) {
                $query->where('user_id', Auth::id())
                    ->orWhereHas('members', function ($q) {
                        $q->where('user_id', Auth::id());
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
        
        $project = new Project();
        $project->name = $validated['name'];
        $project->description = $validated['description'];
        $project->due_date = $validated['due_date'] ?? null;
        $project->status = 'active';
        $project->progress = 0;
        $project->user_id = Auth::id(); // Creator
        $project->save();
        
        // Add creator as a member
        $project->members()->attach(Auth::id());
        
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
        
        // Fire event for real-time updates
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

// Example Model (app/Models/Project.php)
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'description',
        'status',
        'progress',
        'due_date',
    ];
    
    protected $casts = [
        'due_date' => 'datetime',
        'progress' => 'integer',
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

// Example Event (app/Events/ProjectUpdated.php)
namespace App\Events;

use App\Models\Project;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProjectUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $project;
    
    public function __construct(Project $project)
    {
        $this->project = $project;
    }
    
    public function broadcastOn()
    {
        // Broadcast to a specific channel for this project
        return new PresenceChannel('project.' . $this->project->id);
    }
}
