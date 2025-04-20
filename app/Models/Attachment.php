
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = [
        'name',
        'url',
        'type',
        'size',
        'message_id'
    ];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
}
