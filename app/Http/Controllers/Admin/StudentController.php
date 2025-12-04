<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreStudentRequest;
use App\Http\Requests\Admin\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {
    }

    /**
     * Display a listing of students and teachers
     */
    public function index(): Response
    {
        $filters = [
            'search' => request('search'),
            'role' => request('role'),
        ];

        $users = $this->userService->getAllUsers(
            $filters,
            request('per_page', config('constants.pagination.default_per_page'))
        );

        return Inertia::render('Admin/Students/Index', [
            'users' => StudentResource::collection($users),
            'filters' => $filters,
            'roles' => $this->getRoleOptions(),
        ]);
    }

    /**
     * Show the form for creating a new student/teacher
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Students/Create', [
            'roles' => $this->getRoleOptions(),
        ]);
    }

    /**
     * Store a newly created student/teacher
     */
    public function store(StoreStudentRequest $request): RedirectResponse
    {
        try {
            $user = $this->userService->createUser($request->validated());

            return redirect()
                ->route('admin.students.index')
                ->with('success', config('constants.messages.user.created'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Failed to create user: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing a student/teacher
     */
    public function edit(User $user): Response
    {
        // Enrich with face data
        $userWithFace = $this->userService->enrichUsersWithFaceData(collect([$user]))->first();

        return Inertia::render('Admin/Students/Edit', [
            'user' => new StudentResource($userWithFace),
            'roles' => $this->getRoleOptions(),
        ]);
    }

    /**
     * Update a student/teacher
     */
    public function update(UpdateStudentRequest $request, User $user): RedirectResponse
    {
        try {
            // Prevent admin from changing their own role
            if ($user->id === auth()->id() && $request->role !== $user->role) {
                return redirect()
                    ->back()
                    ->with('error', 'You cannot change your own role.');
            }

            $this->userService->updateUser($user, $request->validated());

            return redirect()
                ->route('admin.students.index')
                ->with('success', config('constants.messages.user.updated'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Failed to update user: ' . $e->getMessage());
        }
    }

    /**
     * Remove a student/teacher
     */
    public function destroy(User $user): RedirectResponse
    {
        try {
            // Prevent admin from deleting themselves
            if ($user->id === auth()->id()) {
                return redirect()
                    ->back()
                    ->with('error', config('constants.messages.user.cannot_delete_self'));
            }

            $this->userService->deleteUser($user);

            return redirect()
                ->route('admin.students.index')
                ->with('success', config('constants.messages.user.deleted'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Failed to delete user: ' . $e->getMessage());
        }
    }

    /**
     * Remove face data for a student/teacher
     */
    public function removeFace(User $user): RedirectResponse
    {
        try {
            $response = $this->userService->removeFaceData($user);

            if ($response['success']) {
                return redirect()
                    ->back()
                    ->with('success', config('constants.messages.user.face_removed'));
            }

            return redirect()
                ->back()
                ->with('error', $response['error'] ?? config('constants.messages.user.face_not_found'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Failed to remove face data: ' . $e->getMessage());
        }
    }

    /**
     * Get role options for dropdowns
     */
    private function getRoleOptions(): array
    {
        return [
            [
                'value' => UserRole::STUDENT->value,
                'label' => UserRole::STUDENT->label(),
            ],
            [
                'value' => UserRole::TEACHER->value,
                'label' => UserRole::TEACHER->label(),
            ],
        ];
    }
}
