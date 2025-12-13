<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FaceRecognitionRequest extends FormRequest
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
            'image' => 'required|string|min:100', // Base64 image
        ];
    }

    /**
     * Get custom messages.
     */
    public function messages(): array
    {
        return [
            'image.required' => 'Ảnh không được để trống',
            'image.min' => 'Ảnh không hợp lệ',
        ];
    }
}
