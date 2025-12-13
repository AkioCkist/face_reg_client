<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClassRequest;
use App\Http\Requests\UpdateClassRequest;
use App\Http\Resources\ClassResource;
use App\Models\ClassModel;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClassController extends Controller
{
    /**
     * Display a listing of classes for the teacher.
     */
    public function index()
    {
        $classes = Auth::user()
            ->teachingClasses()
            ->withCount('students')
            ->paginate(15);

        return Inertia::render('Teacher/Classes/Index', [
            'classes' => ClassResource::collection($classes),
        ]);
    }

    /**
     * Show the form for creating a new class.
     */
    public function create()
    {
        return Inertia::render('Teacher/Classes/Create');
    }

    /**
     * Store a newly created class in storage.
     */
    public function store(StoreClassRequest $request)
    {
        $class = Auth::user()->teachingClasses()->create($request->validated());

        return redirect()
            ->route('teacher.classes.show', $class)
            ->with('success', 'Lớp học đã được tạo thành công');
    }

    /**
     * Display the specified class.
     */
    public function show(ClassModel $class)
    {
        // Check if the authenticated user is the teacher of this class
        if ($class->teacher_id !== Auth::id()) {
            abort(403, 'Unauthorized to view this class');
        }

        return Inertia::render('Teacher/Classes/Show', [
            'class' => new ClassResource($class->load('teacher', 'students')),
            'students' => $class->students()->paginate(20),
        ]);
    }

    /**
     * Show the form for editing the specified class.
     */
    public function edit(ClassModel $class)
    {
        // Check if the authenticated user is the teacher of this class
        if ($class->teacher_id !== Auth::id()) {
            abort(403, 'Unauthorized to edit this class');
        }

        return Inertia::render('Teacher/Classes/Edit', [
            'class' => new ClassResource($class),
        ]);
    }

    /**
     * Update the specified class in storage.
     */
    public function update(UpdateClassRequest $request, ClassModel $class)
    {
        // Check if the authenticated user is the teacher of this class
        if ($class->teacher_id !== Auth::id()) {
            abort(403, 'Unauthorized to update this class');
        }

        $class->update($request->validated());

        return redirect()
            ->route('teacher.classes.show', $class)
            ->with('success', 'Lớp học đã được cập nhật thành công');
    }

    /**
     * Remove the specified class from storage.
     */
    public function destroy(ClassModel $class)
    {
        // Check if the authenticated user is the teacher of this class
        if ($class->teacher_id !== Auth::id()) {
            abort(403, 'Unauthorized to delete this class');
        }

        $class->delete();

        return redirect()
            ->route('teacher.classes.index')
            ->with('success', 'Lớp học đã được xóa thành công');
    }

    /**
     * Get students in a specific class.
     */
    public function getStudents(ClassModel $class)
    {
        // Check if the authenticated user is the teacher of this class
        if ($class->teacher_id !== Auth::id()) {
            abort(403, 'Unauthorized to view students of this class');
        }

        $students = $class->students()
            ->select('users.*')
            ->paginate(20);

        return response()->json([
            'data' => $students,
        ]);
    }

    /**
     * Add student to class.
     */
    public function addStudent(ClassModel $class)
    {
        // Check if the authenticated user is the teacher of this class
        if ($class->teacher_id !== Auth::id()) {
            abort(403, 'Unauthorized to add students to this class');
        }

        $studentId = request()->validate([
            'student_id' => 'required|exists:users,id',
        ])['student_id'];

        $class->students()->attach($studentId);

        return response()->json([
            'message' => 'Học sinh đã được thêm vào lớp',
        ]);
    }

    /**
     * Remove student from class.
     */
    public function removeStudent(ClassModel $class)
    {
        // Check if the authenticated user is the teacher of this class
        if ($class->teacher_id !== Auth::id()) {
            abort(403, 'Unauthorized to remove students from this class');
        }

        $studentId = request()->validate([
            'student_id' => 'required|exists:users,id',
        ])['student_id'];

        $class->students()->detach($studentId);

        return response()->json([
            'message' => 'Học sinh đã được xóa khỏi lớp',
        ]);
    }
}
