<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
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
            'class_id' => $this->class_id,
            'student_id' => $this->student_id,
            'status' => $this->status,
            'method' => $this->method,
            'marked_at' => $this->marked_at,
            'notes' => $this->notes,
            'student' => new UserResource($this->whenLoaded('student')),
            'class' => new ClassResource($this->whenLoaded('class')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
