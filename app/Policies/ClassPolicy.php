<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ClassModel;

class ClassPolicy
{
    /**
     * Determine whether the user can view the class.
     */
    public function view(User $user, ClassModel $class): bool
    {
        return $user->isTeacher() && $user->id === $class->teacher_id;
    }

    /**
     * Determine whether the user can create classes.
     */
    public function create(User $user): bool
    {
        return $user->isTeacher();
    }

    /**
     * Determine whether the user can update the class.
     */
    public function update(User $user, ClassModel $class): bool
    {
        return $user->isTeacher() && $user->id === $class->teacher_id;
    }

    /**
     * Determine whether the user can delete the class.
     */
    public function delete(User $user, ClassModel $class): bool
    {
        return $user->isTeacher() && $user->id === $class->teacher_id;
    }
}
