
<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $messages = Message::with(['sender', 'attachments'])
            ->latest()
            ->paginate(50);
            
        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'attachments.*' => 'nullable|file|max:10240', // 10MB max
        ]);

        $message = new Message([
            'content' => $validated['content'],
            'sender_id' => auth()->id(),
        ]);

        $message->save();

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('attachments', 'public');
                $message->attachments()->create([
                    'name' => $file->getClientOriginalName(),
                    'url' => $path,
                    'type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                ]);
            }
        }

        $message->load(['sender', 'attachments']);
        return response()->json($message, 201);
    }
}
