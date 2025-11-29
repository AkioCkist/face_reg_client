#!/usr/bin/env php
<?php

/**
 * Set User Role Helper Script
 * 
 * Usage: php set-user-role.php <user_id> <role>
 * Example: php set-user-role.php 1 admin
 * 
 * Valid roles: admin, teacher, student
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Get arguments
$userId = $argv[1] ?? null;
$role = $argv[2] ?? null;

if (!$userId || !$role) {
    echo "Usage: php set-user-role.php <user_id> <role>\n";
    echo "Example: php set-user-role.php 1 admin\n";
    echo "Valid roles: admin, teacher, student\n";
    exit(1);
}

// Validate role
$validRoles = ['admin', 'teacher', 'student'];
if (!in_array($role, $validRoles)) {
    echo "Error: Invalid role '{$role}'\n";
    echo "Valid roles: " . implode(', ', $validRoles) . "\n";
    exit(1);
}

// Find user
$user = App\Models\User::find($userId);

if (!$user) {
    echo "Error: User with ID {$userId} not found\n";
    exit(1);
}

// Update role
$user->role = $role;
$user->save();

echo "✓ Successfully set role '{$role}' for user #{$userId} ({$user->name})\n";
echo "  Email: {$user->email}\n";
echo "  Role: {$user->role}\n";
