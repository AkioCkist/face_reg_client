<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClassResource;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClassController extends Controller
{
    /**
     * Display all classes the student is enrolled in.
     */
    public function index()
    {
        $classes = Auth::user()
            ->enrolledClasses()
            ->with('teacher')
            ->paginate(15);

        return Inertia::render('Student/Classes/Index', [
            'classes' => ClassResource::collection($classes),
        ]);
    }

    /**
     * Display a specific class.
     */
    public function show($classId)
    {
        $class = Auth::user()
            ->enrolledClasses()
            ->where('classes.id', $classId)
            ->with('teacher')
            ->firstOrFail();

        return Inertia::render('Student/Classes/Show', [
            'class' => new ClassResource($class),
        ]);
    }
}
