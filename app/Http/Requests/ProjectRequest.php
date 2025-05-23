
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'sometimes|in:active,completed,archived',
            'progress' => 'sometimes|integer|min:0|max:100',
            'due_date' => 'nullable|date'
        ];
    }
}
