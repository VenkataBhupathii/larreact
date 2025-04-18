
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'sender_id',
        'content',
        'read'
    ];

    protected $casts = [
        'read' => 'boolean'
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
}
