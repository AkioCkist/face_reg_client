<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudentAccount;
use Illuminate\Http\Request;

class StudentSearchController extends Controller
{
    /**
     * Search for students by student_id, name, or email
     */
    public function search(Request $request)
    {
        $query = $request->input('query', '');

        if (empty(trim($query))) {
            return response()->json([
                'data' => [],
            ]);
        }

        $searchTerm = trim($query);
        
        $students = StudentAccount::query()
            ->where('is_active', true)
            ->where(function ($q) use ($searchTerm) {
                $q->where('student_id', 'like', "%{$searchTerm}%")
                  ->orWhere('name', 'like', "%{$searchTerm}%")
                  ->orWhere('email', 'like', "%{$searchTerm}%");
            })
            ->select('id', 'student_id', 'name', 'email', 'department', 'academic_year')
            ->orderBy('student_id')
            ->limit(10)
            ->get();

        return response()->json([
            'data' => $students,
            'total' => $students->count(),
        ]);
    }
}
