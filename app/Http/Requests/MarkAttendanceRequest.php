<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarkAttendanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->isTeacher();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'class_id' => 'required|exists:classes,id',
            'student_id' => 'required|exists:users,id',
            'status' => ['required', Rule::in(['present', 'late', 'absent'])],
            'method' => ['required', Rule::in(['manual', 'face'])],
            'notes' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get custom messages.
     */
    public function messages(): array
    {
        return [
            'status.in' => 'Trạng thái không hợp lệ',
            'method.in' => 'Phương thức không hợp lệ',
        ];
    }
}
