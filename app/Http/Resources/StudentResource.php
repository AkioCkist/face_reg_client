<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'student_id' => $this->student_id,
            'role' => $this->role,
            'role_label' => $this->getRoleLabel(),
            'has_face' => $this->when(
                isset($this->has_face),
                $this->has_face ?? false
            ),
            'face_id' => $this->when(
                isset($this->face_id),
                $this->face_id
            ),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Get the role label for display
     */
    private function getRoleLabel(): string
    {
        return match ($this->role) {
            'admin' => 'Administrator',
            'teacher' => 'Teacher',
            'student' => 'Student',
            default => ucfirst($this->role),
        };
    }
}
